const { getSavedItineraryById } = require('./src/utils/firebase');
const { mapSavedItineraryToShareable } = require('./src/utils/itineraryMapper');

async function run() {
  const id = 'pN9tV909udCj9ha98P6q';
  try {
    const rawData = await getSavedItineraryById(id);
    if (!rawData) {
      console.log('No data found for ID:', id);
      return;
    }
    const itineraryData = mapSavedItineraryToShareable(rawData);
    console.log('Customer Name:', itineraryData.customerName);
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
