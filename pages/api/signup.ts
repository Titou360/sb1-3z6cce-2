import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, lastName, email, phoneNumber, establishmentName, establishmentType, establishmentAddress, establishmentPhone, password } = req.body;

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Check if user already exists
    const [existingUsers] = await connection.execute(
      'SELECT * FROM users WHERE email = ? OR phone_number = ?',
      [email, phoneNumber]
    );

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      await connection.end();
      return res.status(400).json({ message: 'User with this email or phone number already exists' });
    }

    // Generate QR code and affiliate link
    const qrCode = uuidv4();
    const affiliateLink = `https://roomcare.pro/invite/${qrCode}`;

    // Insert user data
    const [userResult] = await connection.execute(
      'INSERT INTO users (first_name, last_name, email, phone_number, password, is_master, qr_code, affiliate_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [firstName, lastName, email, phoneNumber, password, true, qrCode, affiliateLink]
    );

    const userId = (userResult as any).insertId;

    // Insert establishment data
    await connection.execute(
      'INSERT INTO establishments (user_id, name, type, address, phone_number) VALUES (?, ?, ?, ?, ?)',
      [userId, establishmentName, establishmentType, establishmentAddress, establishmentPhone]
    );

    await connection.end();

    res.status(200).json({
      message: 'User registered successfully',
      user: {
        id: userId,
        firstName,
        lastName,
        email,
        hotelName: establishmentName,
        isMaster: true,
      },
      qrCode,
      affiliateLink,
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Error during signup. Please try again.' });
  }
}