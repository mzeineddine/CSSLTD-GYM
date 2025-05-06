import Calendar_Header from "../Calendar_Header"

const Calendar = () => {
  return(
    <Calendar_Header />
  )
} 
export default Calendar
// import { useState } from 'react';
// import { ChevronLeft, ChevronRight, User, Clock } from 'lucide-react';

// const Calendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 11)); // November 11, 2024
//   const [viewMode, setViewMode] = useState('month'); // 'week', 'month', 'day'
//   // // Sample events data
//   const events = [
//   //   {
//   //     id: 1,
//   //     date: new Date(2024, 10, 11),
//   //     time: '11 AM',
//   //     startHour: 11,
//   //     startMinute: 0,
//   //     endHour: 11,
//   //     endMinute: 25,
//   //     title: 'Jane Cooper',
//   //     attendee: 'Dr Ahmed',
//   //     color: 'bg-blue-500',
//   //     duration: 25
//   //   },
//   //   {
//   //     id: 2,
//   //     date: new Date(2024, 10, 18),
//   //     time: '11 AM',
//   //     startHour: 11,
//   //     startMinute: 0,
//   //     endHour: 11,
//   //     endMinute: 25,
//   //     title: 'Jane Cooper',
//   //     attendee: 'Dr Ahmed',
//   //     color: 'bg-red-500',
//   //     duration: 25
//   //   },
//   //   {
//   //     id: 3,
//   //     date: new Date(2024, 10, 27),
//   //     time: '9:11 AM',
//   //     startHour: 9,
//   //     startMinute: 11,
//   //     endHour: 9,
//   //     endMinute: 36,
//   //     title: 'Jane Cooper',
//   //     attendee: 'Dr Ahmed',
//   //     color: 'bg-teal-500',
//   //     duration: 25
//   //   }
//   ];
//   // Generate days for the current month view
//   const generateDays = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     // First day of the month
//     const firstDay = new Date(year, month, 1);
//     // Array to hold all days to display
//     const daysArray = [];
//     // Get the first day to display (might be from previous month)
//     let startDate = new Date(firstDay);
//     startDate.setDate(firstDay.getDate() - firstDay.getDay() + (firstDay.getDay() === 0 ? -6 : 1));
//     // Generate 36 days (5 weeks)
//     for (let i = 0; i < 36; i++) {
//       const date = new Date(startDate);
//       date.setDate(startDate.getDate() + i);
//       daysArray.push({
//         date,
//         day: date.getDate(),
//         isCurrentMonth: date.getMonth() === month,
//         events: getEventsForDate(date)
//       });
//     }
//     return daysArray;
//   };
//   // Generate days for the current week view
//   const generateWeekDays = () => {
//     const weekDays = [];
//     // Get the start of the week (Monday)
//     const startOfWeek = new Date(currentDate);
//     const day = currentDate.getDay();
//     const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
//     startOfWeek.setDate(diff);
//     // Generate 7 days for the week
//     for (let i = 0; i < 7; i++) {
//       const date = new Date(startOfWeek);
//       date.setDate(startOfWeek.getDate() + i);
//       weekDays.push({
//         date,
//         day: date.getDate(),
//         events: getEventsForDate(date)
//       });
//     }
//     return weekDays;
//   };
//   // Get events for a specific date
//   const getEventsForDate = (date) => {
//     return events.filter(event => 
//       event.date.getDate() === date.getDate() && 
//       event.date.getMonth() === date.getMonth() && 
//       event.date.getFullYear() === date.getFullYear()
//     );
//   };
//   // Navigation handlers
//   const prevPeriod = () => {
//     setCurrentDate(prev => {
//       const newDate = new Date(prev);
//       if (viewMode === 'month') {
//         newDate.setMonth(prev.getMonth() - 1);
//       } else if (viewMode === 'week') {
//         newDate.setDate(prev.getDate() - 7);
//       } else if (viewMode === 'day') {
//         newDate.setDate(prev.getDate() - 1);
//       }
//       return newDate;
//     });
//   };
//   const nextPeriod = () => {
//     setCurrentDate(prev => {
//       const newDate = new Date(prev);
//       if (viewMode === 'month') {
//         newDate.setMonth(prev.getMonth() + 1);
//       } else if (viewMode === 'week') {
//         newDate.setDate(prev.getDate() + 7);
//       } else if (viewMode === 'day') {
//         newDate.setDate(prev.getDate() + 1);
//       }
//       return newDate;
//     });
//   };
//   // Format header text based on view mode
//   const formatHeaderText = () => {
//     if (viewMode === 'month') {
//       return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
//     } else if (viewMode === 'week') {
//       const weekStart = new Date(currentDate);
//       const day = currentDate.getDay();
//       const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
//       weekStart.setDate(diff);
      
//       const weekEnd = new Date(weekStart);
//       weekEnd.setDate(weekStart.getDate() + 6);
      
//       return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
//     } else {
//       return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
//     }
//   };
//   // Generate time slots for day view
//   const generateTimeSlots = () => {
//     const slots = [];
//     for (let hour = 0; hour < 24; hour++) {
//       slots.push({
//         time: `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`,
//         hour,
//         minute: 0
//       });
//       slots.push({
//         time: `${hour % 12 === 0 ? 12 : hour % 12}:30 ${hour < 12 ? 'AM' : 'PM'}`,
//         hour,
//         minute: 30
//       });
//     }
//     return slots;
//   };
//   // Find events for a specific day (used in day view)
//   const getDayEvents = () => {
//     return events.filter(event => 
//       event.date.getDate() === currentDate.getDate() && 
//       event.date.getMonth() === currentDate.getMonth() && 
//       event.date.getFullYear() === currentDate.getFullYear()
//     );
//   };
//   // Days grid for month view
//   const daysGrid = generateDays();
//   // Group days into weeks for month view
//   const weeks = [];
//   for (let i = 0; i < daysGrid.length; i += 7) {
//     weeks.push(daysGrid.slice(i, i + 7));
//   }
//   // Week days for week view
//   const weekDays = generateWeekDays();
//   // Time slots for day view
//   const timeSlots = generateTimeSlots();
//   return (
//     <div className="bg-white rounded-lg shadow">
//       <div className="p-4">
//         <h2 className="text-xl font-bold text-indigo-900 mb-4">Calendar</h2>
//         {/* View toggle */}
//         <div className="flex items-center mb-4">
//           <div className="flex bg-gray-100 rounded-lg overflow-hidden">
//             <button 
//               className={`px-4 py-1 text-sm ${viewMode === 'week' ? 'bg-blue-500 text-white' : 'text-blue-700'}`}
//               onClick={() => setViewMode('week')}
//             >
//               Week
//             </button>
//             <button 
//               className={`px-4 py-1 text-sm ${viewMode === 'month' ? 'bg-blue-500 text-white' : 'text-blue-700'}`}
//               onClick={() => setViewMode('month')}
//             >
//               Month
//             </button>
//             <button 
//               className={`px-4 py-1 text-sm ${viewMode === 'day' ? 'bg-blue-500 text-white' : 'text-blue-700'}`}
//               onClick={() => setViewMode('day')}
//             >
//               Day
//             </button>
//           </div>
//           {/* Calendar navigation */}
//           <div className="flex items-center ml-auto">
//             <button 
//               className="p-1 rounded-full hover:bg-gray-100"
//               onClick={prevPeriod}
//             >
//               <ChevronLeft size={20} />
//             </button>
//             <span className="mx-4 font-medium">{formatHeaderText()}</span>
//             <button 
//               className="p-1 rounded-full hover:bg-gray-100"
//               onClick={nextPeriod}
//             >
//               <ChevronRight size={20} />
//             </button>
//           </div>
//         </div>
//         {/* Calendar content based on view mode */}
//         {viewMode === 'month' && (
//           <div className="border border-gray-200 rounded-lg overflow-hidden">
//             {/* Weekday headers */}
//             <div className="grid grid-cols-7 border-b border-gray-200">
//               <div className="py-2 text-center text-sm font-medium text-gray-500">MON</div>
//               <div className="py-2 text-center text-sm font-medium text-gray-500">TUE</div>
//               <div className="py-2 text-center text-sm font-medium text-gray-500">WED</div>
//               <div className="py-2 text-center text-sm font-medium text-gray-500">THU</div>
//               <div className="py-2 text-center text-sm font-medium text-gray-500">FRI</div>
//               <div className="py-2 text-center text-sm font-medium text-gray-500">SAT</div>
//               <div className="py-2 text-center text-sm font-medium text-gray-500">SUN</div>
//             </div>
//             {/* Days grid */}
//             <div>
//               {weeks.slice(0, 5).map((week, weekIndex) => (
//                 <div key={`week-${weekIndex}`} className="grid grid-cols-7 border-b border-gray-200 last:border-b-0">
//                   {week.map((day, dayIndex) => (
//                     <div 
//                       key={`day-${day.day}-${dayIndex}`} 
//                       className={`min-h-8 border-r border-gray-200 last:border-r-0 relative ${
//                         !day.isCurrentMonth ? 'bg-gray-50 bg-opacity-50 bg-striped' : ''
//                       }`}
//                       onClick={() => {
//                         setCurrentDate(day.date);
//                         setViewMode('day');
//                       }}
//                     >
//                       <div className="p-1">
//                         <span className="text-sm font-normal">{day.day.toString().padStart(2, '0')}</span>
//                         {/* Events */}
//                         {day.events.map(event => (
//                           <div 
//                             key={event.id}
//                             className={`${event.color} p-2 mt-1 rounded text-white`}
//                           >
//                             <div className="text-sm font-medium">{event.title}</div>
//                             <div className="flex items-center mt-1">
//                               <div className="h-6 w-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-1">
//                                 <User size={14} />
//                               </div>
//                               <span className="text-xs">{event.attendee}</span>
//                             </div>
//                             <div className="flex items-center justify-between mt-1">
//                               <span className="text-xs">{event.time}</span>
//                               <span className="text-xs">{event.duration}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//         {/* Week View */}
//         {viewMode === 'week' && (
//           <div className="border border-gray-200 rounded-lg overflow-hidden">
//             {/* Weekday headers */}
//             <div className="grid grid-cols-7 border-b border-gray-200">
//               {weekDays.map((weekDay, index) => (
//                 <div key={`weekday-${index}`} className="py-2 text-center">
//                   <div className="text-sm font-medium text-gray-500">
//                     {weekDay.date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
//                   </div>
//                   <div 
//                     className="text-lg font-medium mt-1 w-8 h-8 rounded-full mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100"
//                     onClick={() => {
//                       setCurrentDate(weekDay.date);
//                       setViewMode('day');
//                     }}
//                   >
//                     {weekDay.day}
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {/* All-day events */}
//             <div className="border-b border-gray-200 p-2">
//               <div className="text-xs text-gray-500 mb-1">ALL DAY</div>
//               <div className="flex gap-2">
//                 {weekDays.flatMap(day => day.events.filter(event => event.startHour === 0)).map(event => (
//                   <div 
//                     key={`all-day-${event.id}`}
//                     className={`${event.color} px-2 py-1 rounded text-white text-xs`}
//                   >
//                     {event.title}
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {/* Time slots and events */}
//             <div className="grid grid-cols-7 relative min-h-6">
//               {/* Time indicators */}
//               {timeSlots.map((slot, index) => (
//                 <div key={`time-${index}`} className="absolute left-0 text-xs text-gray-500" style={{ top: `${index * 30}px` }}>
//                   {index % 2 === 0 && <span className="ml-1">{slot.time}</span>}
//                 </div>
//               ))}
//               {weekDays.map((day, dayIndex) => (
//                 <div key={`day-col-${dayIndex}`} className="border-r border-gray-200 last:border-r-0 relative min-h-6">
//                   {/* Render time slot lines */}
//                   {timeSlots.map((slot, slotIndex) => (
//                     <div 
//                       key={`slot-${dayIndex}-${slotIndex}`} 
//                       className="border-b border-gray-100 h-6"
//                     ></div>
//                   ))}
//                   {/* Events */}
//                   {day.events.filter(event => event.startHour > 0).map(event => {
//                     const topPosition = ((event.startHour - 8) * 60 + event.startMinute) / 2;
//                     const height = event.duration / 2;
                    
//                     return (
//                       <div
//                         key={`event-${event.id}`}
//                         className={`${event.color} absolute rounded p-1 text-white w-5/6 left-2`}
//                         style={{ top: `${topPosition}px`, height: `${height}px` }}
//                       >
//                         <div className="text-xs font-medium truncate">{event.title}</div>
//                         <div className="text-xs truncate">{event.time}</div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//         {/* Day View */}
//         {viewMode === 'day' && (
//           <div className="border border-gray-200 rounded-lg overflow-hidden">
//             {/* Day header */}
//             <div className="p-4 border-b border-gray-200 bg-gray-50">
//               <div className="text-sm text-gray-500">
//                 {currentDate.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()}
//               </div>
//               <div className="text-2xl font-medium">
//                 {currentDate.getDate()}
//               </div>
//             </div>  
//             {/* Time slots and events */}
//             <div className="relative min-h-6 p-2">
//               {/* Time indicators */}
//               {timeSlots.map((slot, index) => (
//                 <div 
//                   key={`time-${index}`} 
//                   className="border-t border-gray-100 relative h-12"
//                 >
//                   <span className="absolute -top-2 left-0 text-xs text-gray-500">
//                     {index % 2 === 0 && slot.time}
//                   </span>
//                 </div>
//               ))}
//               {/* Events */}
//               {getDayEvents().map(event => {
//                 const topPosition = ((event.startHour - 8) * 60 + event.startMinute) * 2;
//                 const height = event.duration * 2;
//                 return (
//                   <div
//                     key={`event-${event.id}`}
//                     className={`${event.color} absolute rounded p-2 text-white left-16 right-4`}
//                     style={{ top: `${topPosition}px`, height: `${height}px` }}
//                   >
//                     <div className="font-medium">{event.title}</div>
//                     <div className="flex items-center mt-1">
//                       <div className="h-6 w-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-1">
//                         <User size={14} />
//                       </div>
//                       <span className="text-sm">{event.attendee}</span>
//                     </div>
//                     <div className="flex items-center justify-between mt-1">
//                       <div className="flex items-center">
//                         <Clock size={14} className="mr-1" />
//                         <span className="text-sm">{event.time}</span>
//                       </div>
//                       <span className="text-sm">{event.duration} min</span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Calendar;