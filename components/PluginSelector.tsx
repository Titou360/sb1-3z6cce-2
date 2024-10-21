'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { togglePlugin, addToCart } from '@/lib/slices/pluginSlice';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PluginSelector = () => {
  const dispatch = useDispatch();
  const { availablePlugins, selectedPlugins, cart } = useSelector((state: RootState) => state.plugins);
  const { isMaster, selectedPlan, roomCount } = useSelector((state: RootState) => state.user);

  const handleToggle = (pluginId: string) => {
    dispatch(togglePlugin(pluginId));
  };

  const handleAddToCart = (pluginId: string) => {
    if (isMaster) {
      dispatch(addToCart(pluginId));
    }
  };

  const isPluginAvailable = (pluginName: string) => {
    switch (selectedPlan) {
      case 'free':
        return ['Team Management', 'Planning', 'Instruction Booklet'].includes(pluginName);
      case 'basic':
        return ['Team Management', 'Planning', 'Instruction Booklet', 'Mailbox', 'Maintenance Tracker'].includes(pluginName);
      case 'pro':
        return ['Team Management', 'Planning', 'Instruction Booklet', 'Mailbox', 'Maintenance Tracker', 'Housekeeping Manager', 'Inventory Management', 'Reporting'].includes(pluginName);
      case 'enterprise':
        return true;
      default:
        return false;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availablePlugins.map((plugin) => (
          <Card key={plugin.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {plugin.name}
                <Switch
                  checked={selectedPlugins.includes(plugin.id)}
                  onCheckedChange={() => handleToggle(plugin.id)}
                  disabled={!isPluginAvailable(plugin.name)}
                />
              </CardTitle>
              <CardDescription>{plugin.price === 'FREE' ? 'FREE' : `$${plugin.price}/month`}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{plugin.description}</p>
              {!isPluginAvailable(plugin.name) && (
                <p className="text-sm text-red-500 mt-2">Not available in your current plan</p>
              )}
              {isMaster && plugin.price !== 'FREE' && !cart.includes(plugin.id) && isPluginAvailable(plugin.name) && (
                <Button onClick={() => handleAddToCart(plugin.id)} className="mt-2">
                  Add to Cart
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {isMaster && cart.length > 0 && (
        <Button className="mt-4">Proceed to Checkout ({cart.length} items)</Button>
      )}
    </div>
  );
};

export default PluginSelector;