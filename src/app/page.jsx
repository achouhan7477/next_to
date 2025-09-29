'use client';
import Navbar from '../components/Navbar';
import TodoListView from '../components/TodoListView';
import ProfileSection from '../components/ProfileSection';
import ThemeToggle from '../components/ThemeToggle';
import CalculatorModal from '../components/CalculatorModal';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Page() {
  const [calcOpen, setCalcOpen] = useState(false);

  const [cards, setCards] = useState([
    { id: 'personal', title: 'Personal Tasks', desc: 'Home tasks' },
    { id: 'work', title: 'Work Tasks', desc: 'Office tasks' },
    { id: 'shopping', title: 'Shopping List', desc: 'Items to buy' },
  ]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newCards = Array.from(cards);
    const [movedCard] = newCards.splice(result.source.index, 1);
    newCards.splice(result.destination.index, 0, movedCard);

    setCards(newCards);
  };

  return (
    <div>
      <Sidebar />
      <Navbar />
      <main>
        <ThemeToggle />
        <h1>Dashboard</h1>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="cards" direction="horizontal">
            {(provided) => (
              <div
                className="cards"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {cards.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          margin: '0 10px 0 0',
                          ...provided.draggableProps.style,
                        }}
                      >
                        <TodoListView
                          listKey={card.id}
                          title={card.title}
                          desc={card.desc}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </main>
      <ProfileSection />
      <CalculatorModal open={calcOpen} onClose={() => setCalcOpen(false)} />
    </div>
  );
}
