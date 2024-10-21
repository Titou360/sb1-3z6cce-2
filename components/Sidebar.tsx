'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Menu, GripVertical, Pencil, Mail, Settings } from 'lucide-react';
import Link from 'next/link';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { setSelectedPlugins, updatePluginName } from '@/lib/slices/pluginSlice';
import { Input } from '@/components/ui/input';
import InviteCollaborators from './InviteCollaborators';
import { Badge } from '@/components/ui/badge';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const { selectedPlugins, availablePlugins } = useSelector((state: RootState) => state.plugins);
  const { isMaster, pendingCollaborators } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(selectedPlugins);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(setSelectedPlugins(items));
  };

  const handleEdit = (id: string, currentValue: string) => {
    setEditingId(id);
    setEditValue(currentValue);
  };

  const handleSaveEdit = (id: string) => {
    dispatch(updatePluginName({ id, name: editValue }));
    setEditingId(null);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetTitle className="flex items-center space-x-2 mb-6">
          <AlertCircle className="h-6 w-6 text-primary" />
          <span className="text-2xl font-bold">RoomCare.Pro</span>
        </SheetTitle>
        <Separator className="mb-6" />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="plugins">
            {(provided) => (
              <nav {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {selectedPlugins.map((pluginId, index) => {
                  const plugin = availablePlugins.find(p => p.id === pluginId);
                  if (!plugin) return null;
                  return (
                    <Draggable key={plugin.id} draggableId={plugin.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <span {...provided.dragHandleProps}>
                            <GripVertical className="h-4 w-4 text-gray-400" />
                          </span>
                          <AlertCircle className="h-4 w-4" />
                          {editingId === plugin.id ? (
                            <Input
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={() => handleSaveEdit(plugin.id)}
                              onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit(plugin.id)}
                              className="w-32"
                            />
                          ) : (
                            <Link href="#">
                              {plugin.name.split(' ')[0]}
                            </Link>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(plugin.id, plugin.name.split(' ')[0])}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          {plugin.name === 'Mailbox' && (
                            <Badge variant="secondary">
                              <Mail className="h-3 w-3 mr-1" />
                              New
                            </Badge>
                          )}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </nav>
            )}
          </Droppable>
        </DragDropContext>
        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          {isMaster && <InviteCollaborators />}
          <Button className="w-full" variant="outline">
            Upgrade your plan
          </Button>
          <Link href="/configuration" passHref>
            <Button className="w-full" variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configuration
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;