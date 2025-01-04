export const QuickAccessCard = ({ title, description, link }) => (
  <div className="bg-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
    <h2 className="text-lg font-bold text-blue-900">{title}</h2>
    <p className="text-sm text-gray-600 mt-2">{description}</p>
    <a
      href={link}
      className="text-blue-700 mt-4 block font-medium hover:underline"
    >
      Learn More
    </a>
  </div>
);

// MetricsSection.js
export const MetricsSection = () => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-lg font-bold text-blue-900 mb-4">
      Account Performance
    </h3>
    <div className="h-48 bg-gray-100 flex items-center justify-center">
      (Chart Placeholder)
    </div>
  </div>
);

// UpcomingCalls.js
export const UpcomingCalls = () => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-lg font-bold text-blue-900 mb-4">Upcoming Calls</h3>
    <ul>
      <li className="mb-2 text-gray-700">Spice Garden: 3:00 PM</li>
      <li className="text-gray-700">Food Haven: 4:30 PM</li>
    </ul>
  </div>
);
