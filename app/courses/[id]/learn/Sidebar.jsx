export default function Sidebar({ lessons, currentDay, setCurrentDay }) {
  return (
    <div className="w-full mt-12 overflow-y-auto bg-gray-100 border-r border-gray-300 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 md:w-[13rem] xl:w-[17rem]">
      <ul className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-gray-600">Content</h3>
        {lessons.map((lesson, index) => (
          <li
            key={index}
            onClick={() => setCurrentDay(lesson.day)}
            className={`p-3 rounded-md cursor-pointer ${
              currentDay === lesson.day
                ? "bg-gray-200 text-black"
                : "text-black hover:bg-gray-200"
            }`}
          >
            <span className="mr-2">
              {currentDay === lesson.day ? "🔵" : "🔴"}
            </span>
            Day {lesson.day}
          </li>
        ))}
      </ul>
    </div>
  );
}
