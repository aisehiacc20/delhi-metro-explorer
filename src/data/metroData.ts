export type MetroLine = 
  | 'red' 
  | 'yellow' 
  | 'blue' 
  | 'green' 
  | 'violet' 
  | 'pink' 
  | 'magenta' 
  | 'grey' 
  | 'orange'
  | 'aqua';

export interface Station {
  id: string;
  name: string;
  lines: MetroLine[];
  connections: { stationId: string; time: number; line: MetroLine }[];
}

export interface MetroData {
  stations: Station[];
  lines: { id: MetroLine; name: string; color: string }[];
}

export const metroLines: { id: MetroLine; name: string; color: string }[] = [
  { id: 'red', name: 'Red Line', color: 'hsl(358, 82%, 50%)' },
  { id: 'yellow', name: 'Yellow Line', color: 'hsl(48, 100%, 50%)' },
  { id: 'blue', name: 'Blue Line', color: 'hsl(207, 100%, 35%)' },
  { id: 'green', name: 'Green Line', color: 'hsl(145, 100%, 32%)' },
  { id: 'violet', name: 'Violet Line', color: 'hsl(270, 50%, 55%)' },
  { id: 'pink', name: 'Pink Line', color: 'hsl(340, 76%, 65%)' },
  { id: 'magenta', name: 'Magenta Line', color: 'hsl(330, 100%, 40%)' },
  { id: 'grey', name: 'Grey Line', color: 'hsl(0, 0%, 62%)' },
  { id: 'orange', name: 'Airport Express', color: 'hsl(30, 92%, 54%)' },
  { id: 'aqua', name: 'Aqua Line', color: 'hsl(187, 100%, 42%)' },
];

// Complete Delhi Metro stations data
export const stations: Station[] = [
  // Red Line (Rithala to Shaheed Sthal)
  { id: 'rithala', name: 'Rithala', lines: ['red'], connections: [{ stationId: 'rohini-west', time: 2, line: 'red' }] },
  { id: 'rohini-west', name: 'Rohini West', lines: ['red'], connections: [{ stationId: 'rithala', time: 2, line: 'red' }, { stationId: 'rohini-east', time: 2, line: 'red' }] },
  { id: 'rohini-east', name: 'Rohini East', lines: ['red'], connections: [{ stationId: 'rohini-west', time: 2, line: 'red' }, { stationId: 'pitampura', time: 2, line: 'red' }] },
  { id: 'pitampura', name: 'Pitampura', lines: ['red'], connections: [{ stationId: 'rohini-east', time: 2, line: 'red' }, { stationId: 'kohat-enclave', time: 2, line: 'red' }] },
  { id: 'kohat-enclave', name: 'Kohat Enclave', lines: ['red'], connections: [{ stationId: 'pitampura', time: 2, line: 'red' }, { stationId: 'netaji-subhash-place', time: 2, line: 'red' }] },
  { id: 'netaji-subhash-place', name: 'Netaji Subhash Place', lines: ['red', 'pink'], connections: [{ stationId: 'kohat-enclave', time: 2, line: 'red' }, { stationId: 'keshav-puram', time: 2, line: 'red' }, { stationId: 'shalimar-bagh', time: 3, line: 'pink' }, { stationId: 'shakurpur', time: 3, line: 'pink' }] },
  { id: 'keshav-puram', name: 'Keshav Puram', lines: ['red'], connections: [{ stationId: 'netaji-subhash-place', time: 2, line: 'red' }, { stationId: 'kanhaiya-nagar', time: 2, line: 'red' }] },
  { id: 'kanhaiya-nagar', name: 'Kanhaiya Nagar', lines: ['red'], connections: [{ stationId: 'keshav-puram', time: 2, line: 'red' }, { stationId: 'inderlok', time: 2, line: 'red' }] },
  { id: 'inderlok', name: 'Inderlok', lines: ['red', 'green'], connections: [{ stationId: 'kanhaiya-nagar', time: 2, line: 'red' }, { stationId: 'shastri-nagar', time: 2, line: 'red' }, { stationId: 'ashok-park-main', time: 2, line: 'green' }, { stationId: 'satguru-ram-singh-marg', time: 2, line: 'green' }] },
  { id: 'shastri-nagar', name: 'Shastri Nagar', lines: ['red'], connections: [{ stationId: 'inderlok', time: 2, line: 'red' }, { stationId: 'pratap-nagar', time: 2, line: 'red' }] },
  { id: 'pratap-nagar', name: 'Pratap Nagar', lines: ['red'], connections: [{ stationId: 'shastri-nagar', time: 2, line: 'red' }, { stationId: 'pulbangash', time: 2, line: 'red' }] },
  { id: 'pulbangash', name: 'Pulbangash', lines: ['red'], connections: [{ stationId: 'pratap-nagar', time: 2, line: 'red' }, { stationId: 'tis-hazari', time: 2, line: 'red' }] },
  { id: 'tis-hazari', name: 'Tis Hazari', lines: ['red'], connections: [{ stationId: 'pulbangash', time: 2, line: 'red' }, { stationId: 'kashmere-gate', time: 2, line: 'red' }] },
  { id: 'kashmere-gate', name: 'Kashmere Gate', lines: ['red', 'yellow', 'violet'], connections: [{ stationId: 'tis-hazari', time: 2, line: 'red' }, { stationId: 'shastri-park', time: 3, line: 'red' }, { stationId: 'civil-lines', time: 2, line: 'yellow' }, { stationId: 'chandni-chowk', time: 3, line: 'yellow' }, { stationId: 'lal-quila', time: 2, line: 'violet' }] },
  { id: 'shastri-park', name: 'Shastri Park', lines: ['red'], connections: [{ stationId: 'kashmere-gate', time: 3, line: 'red' }, { stationId: 'seelampur', time: 2, line: 'red' }] },
  { id: 'seelampur', name: 'Seelampur', lines: ['red'], connections: [{ stationId: 'shastri-park', time: 2, line: 'red' }, { stationId: 'welcome', time: 2, line: 'red' }] },
  { id: 'welcome', name: 'Welcome', lines: ['red', 'pink'], connections: [{ stationId: 'seelampur', time: 2, line: 'red' }, { stationId: 'shahdara', time: 2, line: 'red' }, { stationId: 'jaffrabad', time: 2, line: 'pink' }, { stationId: 'maujpur-babarpur', time: 2, line: 'pink' }] },
  { id: 'shahdara', name: 'Shahdara', lines: ['red'], connections: [{ stationId: 'welcome', time: 2, line: 'red' }, { stationId: 'mansarovar-park', time: 2, line: 'red' }] },
  { id: 'mansarovar-park', name: 'Mansarovar Park', lines: ['red'], connections: [{ stationId: 'shahdara', time: 2, line: 'red' }, { stationId: 'jhilmil', time: 2, line: 'red' }] },
  { id: 'jhilmil', name: 'Jhilmil', lines: ['red'], connections: [{ stationId: 'mansarovar-park', time: 2, line: 'red' }, { stationId: 'dilshad-garden', time: 2, line: 'red' }] },
  { id: 'dilshad-garden', name: 'Dilshad Garden', lines: ['red'], connections: [{ stationId: 'jhilmil', time: 2, line: 'red' }, { stationId: 'shaheed-nagar', time: 2, line: 'red' }] },
  { id: 'shaheed-nagar', name: 'Shaheed Nagar', lines: ['red'], connections: [{ stationId: 'dilshad-garden', time: 2, line: 'red' }, { stationId: 'raj-bagh', time: 2, line: 'red' }] },
  { id: 'raj-bagh', name: 'Raj Bagh', lines: ['red'], connections: [{ stationId: 'shaheed-nagar', time: 2, line: 'red' }, { stationId: 'rajdhani-park', time: 2, line: 'red' }] },
  { id: 'rajdhani-park', name: 'Rajdhani Park', lines: ['red'], connections: [{ stationId: 'raj-bagh', time: 2, line: 'red' }, { stationId: 'shaheed-sthal', time: 2, line: 'red' }] },
  { id: 'shaheed-sthal', name: 'Shaheed Sthal (New Bus Adda)', lines: ['red'], connections: [{ stationId: 'rajdhani-park', time: 2, line: 'red' }] },

  // Yellow Line (Samaypur Badli to HUDA City Centre)
  { id: 'samaypur-badli', name: 'Samaypur Badli', lines: ['yellow'], connections: [{ stationId: 'rohini-sector-18-19', time: 2, line: 'yellow' }] },
  { id: 'rohini-sector-18-19', name: 'Rohini Sector 18, 19', lines: ['yellow'], connections: [{ stationId: 'samaypur-badli', time: 2, line: 'yellow' }, { stationId: 'haiderpur-badli-mor', time: 2, line: 'yellow' }] },
  { id: 'haiderpur-badli-mor', name: 'Haiderpur Badli Mor', lines: ['yellow'], connections: [{ stationId: 'rohini-sector-18-19', time: 2, line: 'yellow' }, { stationId: 'jahangirpuri', time: 2, line: 'yellow' }] },
  { id: 'jahangirpuri', name: 'Jahangirpuri', lines: ['yellow'], connections: [{ stationId: 'haiderpur-badli-mor', time: 2, line: 'yellow' }, { stationId: 'adarsh-nagar', time: 2, line: 'yellow' }] },
  { id: 'adarsh-nagar', name: 'Adarsh Nagar', lines: ['yellow'], connections: [{ stationId: 'jahangirpuri', time: 2, line: 'yellow' }, { stationId: 'azadpur', time: 2, line: 'yellow' }] },
  { id: 'azadpur', name: 'Azadpur', lines: ['yellow', 'pink'], connections: [{ stationId: 'adarsh-nagar', time: 2, line: 'yellow' }, { stationId: 'model-town', time: 2, line: 'yellow' }, { stationId: 'shalimar-bagh', time: 3, line: 'pink' }, { stationId: 'gulabi-bagh', time: 3, line: 'pink' }] },
  { id: 'model-town', name: 'Model Town', lines: ['yellow'], connections: [{ stationId: 'azadpur', time: 2, line: 'yellow' }, { stationId: 'guru-tegh-bahadur-nagar', time: 2, line: 'yellow' }] },
  { id: 'guru-tegh-bahadur-nagar', name: 'Guru Tegh Bahadur Nagar', lines: ['yellow'], connections: [{ stationId: 'model-town', time: 2, line: 'yellow' }, { stationId: 'vishwavidyalaya', time: 2, line: 'yellow' }] },
  { id: 'vishwavidyalaya', name: 'Vishwavidyalaya', lines: ['yellow'], connections: [{ stationId: 'guru-tegh-bahadur-nagar', time: 2, line: 'yellow' }, { stationId: 'vidhan-sabha', time: 2, line: 'yellow' }] },
  { id: 'vidhan-sabha', name: 'Vidhan Sabha', lines: ['yellow'], connections: [{ stationId: 'vishwavidyalaya', time: 2, line: 'yellow' }, { stationId: 'civil-lines', time: 2, line: 'yellow' }] },
  { id: 'civil-lines', name: 'Civil Lines', lines: ['yellow'], connections: [{ stationId: 'vidhan-sabha', time: 2, line: 'yellow' }, { stationId: 'kashmere-gate', time: 2, line: 'yellow' }] },
  { id: 'chandni-chowk', name: 'Chandni Chowk', lines: ['yellow'], connections: [{ stationId: 'kashmere-gate', time: 3, line: 'yellow' }, { stationId: 'chawri-bazar', time: 2, line: 'yellow' }] },
  { id: 'chawri-bazar', name: 'Chawri Bazar', lines: ['yellow'], connections: [{ stationId: 'chandni-chowk', time: 2, line: 'yellow' }, { stationId: 'new-delhi', time: 2, line: 'yellow' }] },
  { id: 'new-delhi', name: 'New Delhi', lines: ['yellow', 'orange'], connections: [{ stationId: 'chawri-bazar', time: 2, line: 'yellow' }, { stationId: 'rajiv-chowk', time: 2, line: 'yellow' }, { stationId: 'shivaji-stadium', time: 3, line: 'orange' }] },
  { id: 'rajiv-chowk', name: 'Rajiv Chowk', lines: ['yellow', 'blue'], connections: [{ stationId: 'new-delhi', time: 2, line: 'yellow' }, { stationId: 'patel-chowk', time: 2, line: 'yellow' }, { stationId: 'barakhamba-road', time: 2, line: 'blue' }, { stationId: 'rk-ashram-marg', time: 2, line: 'blue' }] },
  { id: 'patel-chowk', name: 'Patel Chowk', lines: ['yellow'], connections: [{ stationId: 'rajiv-chowk', time: 2, line: 'yellow' }, { stationId: 'central-secretariat', time: 2, line: 'yellow' }] },
  { id: 'central-secretariat', name: 'Central Secretariat', lines: ['yellow', 'violet'], connections: [{ stationId: 'patel-chowk', time: 2, line: 'yellow' }, { stationId: 'udyog-bhawan', time: 2, line: 'yellow' }, { stationId: 'khan-market', time: 2, line: 'violet' }, { stationId: 'janpath', time: 2, line: 'violet' }] },
  { id: 'udyog-bhawan', name: 'Udyog Bhawan', lines: ['yellow'], connections: [{ stationId: 'central-secretariat', time: 2, line: 'yellow' }, { stationId: 'lok-kalyan-marg', time: 2, line: 'yellow' }] },
  { id: 'lok-kalyan-marg', name: 'Lok Kalyan Marg', lines: ['yellow'], connections: [{ stationId: 'udyog-bhawan', time: 2, line: 'yellow' }, { stationId: 'jorbagh', time: 2, line: 'yellow' }] },
  { id: 'jorbagh', name: 'Jor Bagh', lines: ['yellow'], connections: [{ stationId: 'lok-kalyan-marg', time: 2, line: 'yellow' }, { stationId: 'ina', time: 2, line: 'yellow' }] },
  { id: 'ina', name: 'INA', lines: ['yellow', 'pink'], connections: [{ stationId: 'jorbagh', time: 2, line: 'yellow' }, { stationId: 'aiims', time: 2, line: 'yellow' }, { stationId: 'south-extension', time: 3, line: 'pink' }, { stationId: 'dilli-haat-ina', time: 2, line: 'pink' }] },
  { id: 'aiims', name: 'AIIMS', lines: ['yellow'], connections: [{ stationId: 'ina', time: 2, line: 'yellow' }, { stationId: 'green-park', time: 2, line: 'yellow' }] },
  { id: 'green-park', name: 'Green Park', lines: ['yellow'], connections: [{ stationId: 'aiims', time: 2, line: 'yellow' }, { stationId: 'hauz-khas', time: 2, line: 'yellow' }] },
  { id: 'hauz-khas', name: 'Hauz Khas', lines: ['yellow', 'magenta'], connections: [{ stationId: 'green-park', time: 2, line: 'yellow' }, { stationId: 'malviya-nagar', time: 2, line: 'yellow' }, { stationId: 'panchsheel-park', time: 3, line: 'magenta' }, { stationId: 'iit-delhi', time: 3, line: 'magenta' }] },
  { id: 'malviya-nagar', name: 'Malviya Nagar', lines: ['yellow'], connections: [{ stationId: 'hauz-khas', time: 2, line: 'yellow' }, { stationId: 'saket', time: 2, line: 'yellow' }] },
  { id: 'saket', name: 'Saket', lines: ['yellow'], connections: [{ stationId: 'malviya-nagar', time: 2, line: 'yellow' }, { stationId: 'qutab-minar', time: 2, line: 'yellow' }] },
  { id: 'qutab-minar', name: 'Qutab Minar', lines: ['yellow'], connections: [{ stationId: 'saket', time: 2, line: 'yellow' }, { stationId: 'chhatarpur', time: 2, line: 'yellow' }] },
  { id: 'chhatarpur', name: 'Chhatarpur', lines: ['yellow'], connections: [{ stationId: 'qutab-minar', time: 2, line: 'yellow' }, { stationId: 'sultanpur', time: 2, line: 'yellow' }] },
  { id: 'sultanpur', name: 'Sultanpur', lines: ['yellow'], connections: [{ stationId: 'chhatarpur', time: 2, line: 'yellow' }, { stationId: 'ghitorni', time: 2, line: 'yellow' }] },
  { id: 'ghitorni', name: 'Ghitorni', lines: ['yellow'], connections: [{ stationId: 'sultanpur', time: 2, line: 'yellow' }, { stationId: 'arjan-garh', time: 2, line: 'yellow' }] },
  { id: 'arjan-garh', name: 'Arjan Garh', lines: ['yellow'], connections: [{ stationId: 'ghitorni', time: 2, line: 'yellow' }, { stationId: 'guru-dronacharya', time: 2, line: 'yellow' }] },
  { id: 'guru-dronacharya', name: 'Guru Dronacharya', lines: ['yellow'], connections: [{ stationId: 'arjan-garh', time: 2, line: 'yellow' }, { stationId: 'sikanderpur', time: 2, line: 'yellow' }] },
  { id: 'sikanderpur', name: 'Sikanderpur', lines: ['yellow'], connections: [{ stationId: 'guru-dronacharya', time: 2, line: 'yellow' }, { stationId: 'mg-road', time: 2, line: 'yellow' }] },
  { id: 'mg-road', name: 'MG Road', lines: ['yellow'], connections: [{ stationId: 'sikanderpur', time: 2, line: 'yellow' }, { stationId: 'iffco-chowk', time: 2, line: 'yellow' }] },
  { id: 'iffco-chowk', name: 'IFFCO Chowk', lines: ['yellow'], connections: [{ stationId: 'mg-road', time: 2, line: 'yellow' }, { stationId: 'huda-city-centre', time: 3, line: 'yellow' }] },
  { id: 'huda-city-centre', name: 'HUDA City Centre', lines: ['yellow'], connections: [{ stationId: 'iffco-chowk', time: 3, line: 'yellow' }] },

  // Blue Line (Dwarka Sector 21 to Noida Electronic City / Vaishali)
  { id: 'dwarka-sector-21', name: 'Dwarka Sector 21', lines: ['blue'], connections: [{ stationId: 'dwarka-sector-8', time: 2, line: 'blue' }] },
  { id: 'dwarka-sector-8', name: 'Dwarka Sector 8', lines: ['blue'], connections: [{ stationId: 'dwarka-sector-21', time: 2, line: 'blue' }, { stationId: 'dwarka-sector-9', time: 2, line: 'blue' }] },
  { id: 'dwarka-sector-9', name: 'Dwarka Sector 9', lines: ['blue'], connections: [{ stationId: 'dwarka-sector-8', time: 2, line: 'blue' }, { stationId: 'dwarka-sector-10', time: 2, line: 'blue' }] },
  { id: 'dwarka-sector-10', name: 'Dwarka Sector 10', lines: ['blue'], connections: [{ stationId: 'dwarka-sector-9', time: 2, line: 'blue' }, { stationId: 'dwarka-sector-11', time: 2, line: 'blue' }] },
  { id: 'dwarka-sector-11', name: 'Dwarka Sector 11', lines: ['blue'], connections: [{ stationId: 'dwarka-sector-10', time: 2, line: 'blue' }, { stationId: 'dwarka-sector-12', time: 2, line: 'blue' }] },
  { id: 'dwarka-sector-12', name: 'Dwarka Sector 12', lines: ['blue'], connections: [{ stationId: 'dwarka-sector-11', time: 2, line: 'blue' }, { stationId: 'dwarka-sector-13', time: 2, line: 'blue' }] },
  { id: 'dwarka-sector-13', name: 'Dwarka Sector 13', lines: ['blue'], connections: [{ stationId: 'dwarka-sector-12', time: 2, line: 'blue' }, { stationId: 'dwarka-sector-14', time: 2, line: 'blue' }] },
  { id: 'dwarka-sector-14', name: 'Dwarka Sector 14', lines: ['blue'], connections: [{ stationId: 'dwarka-sector-13', time: 2, line: 'blue' }, { stationId: 'dwarka', time: 2, line: 'blue' }] },
  { id: 'dwarka', name: 'Dwarka', lines: ['blue'], connections: [{ stationId: 'dwarka-sector-14', time: 2, line: 'blue' }, { stationId: 'dwarka-mor', time: 2, line: 'blue' }] },
  { id: 'dwarka-mor', name: 'Dwarka Mor', lines: ['blue'], connections: [{ stationId: 'dwarka', time: 2, line: 'blue' }, { stationId: 'nawada', time: 2, line: 'blue' }] },
  { id: 'nawada', name: 'Nawada', lines: ['blue'], connections: [{ stationId: 'dwarka-mor', time: 2, line: 'blue' }, { stationId: 'uttam-nagar-west', time: 2, line: 'blue' }] },
  { id: 'uttam-nagar-west', name: 'Uttam Nagar West', lines: ['blue'], connections: [{ stationId: 'nawada', time: 2, line: 'blue' }, { stationId: 'uttam-nagar-east', time: 2, line: 'blue' }] },
  { id: 'uttam-nagar-east', name: 'Uttam Nagar East', lines: ['blue'], connections: [{ stationId: 'uttam-nagar-west', time: 2, line: 'blue' }, { stationId: 'janakpuri-west', time: 2, line: 'blue' }] },
  { id: 'janakpuri-west', name: 'Janakpuri West', lines: ['blue', 'magenta'], connections: [{ stationId: 'uttam-nagar-east', time: 2, line: 'blue' }, { stationId: 'janakpuri-east', time: 2, line: 'blue' }, { stationId: 'dabri-mor-janakpuri-south', time: 3, line: 'magenta' }, { stationId: 'terminal-1-igi-airport', time: 4, line: 'magenta' }] },
  { id: 'janakpuri-east', name: 'Janakpuri East', lines: ['blue'], connections: [{ stationId: 'janakpuri-west', time: 2, line: 'blue' }, { stationId: 'tilak-nagar', time: 2, line: 'blue' }] },
  { id: 'tilak-nagar', name: 'Tilak Nagar', lines: ['blue'], connections: [{ stationId: 'janakpuri-east', time: 2, line: 'blue' }, { stationId: 'subhash-nagar', time: 2, line: 'blue' }] },
  { id: 'subhash-nagar', name: 'Subhash Nagar', lines: ['blue'], connections: [{ stationId: 'tilak-nagar', time: 2, line: 'blue' }, { stationId: 'tagore-garden', time: 2, line: 'blue' }] },
  { id: 'tagore-garden', name: 'Tagore Garden', lines: ['blue'], connections: [{ stationId: 'subhash-nagar', time: 2, line: 'blue' }, { stationId: 'rajouri-garden', time: 2, line: 'blue' }] },
  { id: 'rajouri-garden', name: 'Rajouri Garden', lines: ['blue', 'pink'], connections: [{ stationId: 'tagore-garden', time: 2, line: 'blue' }, { stationId: 'ramesh-nagar', time: 2, line: 'blue' }, { stationId: 'punjabi-bagh-west', time: 3, line: 'pink' }, { stationId: 'mayapuri', time: 3, line: 'pink' }] },
  { id: 'ramesh-nagar', name: 'Ramesh Nagar', lines: ['blue'], connections: [{ stationId: 'rajouri-garden', time: 2, line: 'blue' }, { stationId: 'moti-nagar', time: 2, line: 'blue' }] },
  { id: 'moti-nagar', name: 'Moti Nagar', lines: ['blue'], connections: [{ stationId: 'ramesh-nagar', time: 2, line: 'blue' }, { stationId: 'kirti-nagar', time: 2, line: 'blue' }] },
  { id: 'kirti-nagar', name: 'Kirti Nagar', lines: ['blue', 'green'], connections: [{ stationId: 'moti-nagar', time: 2, line: 'blue' }, { stationId: 'shadipur', time: 2, line: 'blue' }, { stationId: 'madipur', time: 2, line: 'green' }, { stationId: 'satguru-ram-singh-marg', time: 2, line: 'green' }] },
  { id: 'shadipur', name: 'Shadipur', lines: ['blue'], connections: [{ stationId: 'kirti-nagar', time: 2, line: 'blue' }, { stationId: 'patel-nagar', time: 2, line: 'blue' }] },
  { id: 'patel-nagar', name: 'Patel Nagar', lines: ['blue'], connections: [{ stationId: 'shadipur', time: 2, line: 'blue' }, { stationId: 'rajendra-place', time: 2, line: 'blue' }] },
  { id: 'rajendra-place', name: 'Rajendra Place', lines: ['blue'], connections: [{ stationId: 'patel-nagar', time: 2, line: 'blue' }, { stationId: 'karol-bagh', time: 2, line: 'blue' }] },
  { id: 'karol-bagh', name: 'Karol Bagh', lines: ['blue'], connections: [{ stationId: 'rajendra-place', time: 2, line: 'blue' }, { stationId: 'jhandewalan', time: 2, line: 'blue' }] },
  { id: 'jhandewalan', name: 'Jhandewalan', lines: ['blue'], connections: [{ stationId: 'karol-bagh', time: 2, line: 'blue' }, { stationId: 'rk-ashram-marg', time: 2, line: 'blue' }] },
  { id: 'rk-ashram-marg', name: 'RK Ashram Marg', lines: ['blue'], connections: [{ stationId: 'jhandewalan', time: 2, line: 'blue' }, { stationId: 'rajiv-chowk', time: 2, line: 'blue' }] },
  { id: 'barakhamba-road', name: 'Barakhamba Road', lines: ['blue'], connections: [{ stationId: 'rajiv-chowk', time: 2, line: 'blue' }, { stationId: 'mandi-house', time: 2, line: 'blue' }] },
  { id: 'mandi-house', name: 'Mandi House', lines: ['blue', 'violet'], connections: [{ stationId: 'barakhamba-road', time: 2, line: 'blue' }, { stationId: 'pragati-maidan', time: 2, line: 'blue' }, { stationId: 'janpath', time: 2, line: 'violet' }, { stationId: 'ito', time: 2, line: 'violet' }] },
  { id: 'pragati-maidan', name: 'Pragati Maidan', lines: ['blue'], connections: [{ stationId: 'mandi-house', time: 2, line: 'blue' }, { stationId: 'indraprastha', time: 2, line: 'blue' }] },
  { id: 'indraprastha', name: 'Indraprastha', lines: ['blue'], connections: [{ stationId: 'pragati-maidan', time: 2, line: 'blue' }, { stationId: 'yamuna-bank', time: 3, line: 'blue' }] },
  { id: 'yamuna-bank', name: 'Yamuna Bank', lines: ['blue'], connections: [{ stationId: 'indraprastha', time: 3, line: 'blue' }, { stationId: 'akshardham', time: 2, line: 'blue' }, { stationId: 'laxmi-nagar', time: 2, line: 'blue' }] },
  // Blue Line Branch to Vaishali
  { id: 'laxmi-nagar', name: 'Laxmi Nagar', lines: ['blue'], connections: [{ stationId: 'yamuna-bank', time: 2, line: 'blue' }, { stationId: 'nirman-vihar', time: 2, line: 'blue' }] },
  { id: 'nirman-vihar', name: 'Nirman Vihar', lines: ['blue'], connections: [{ stationId: 'laxmi-nagar', time: 2, line: 'blue' }, { stationId: 'preet-vihar', time: 2, line: 'blue' }] },
  { id: 'preet-vihar', name: 'Preet Vihar', lines: ['blue'], connections: [{ stationId: 'nirman-vihar', time: 2, line: 'blue' }, { stationId: 'karkarduma', time: 2, line: 'blue' }] },
  { id: 'karkarduma', name: 'Karkarduma', lines: ['blue', 'pink'], connections: [{ stationId: 'preet-vihar', time: 2, line: 'blue' }, { stationId: 'anand-vihar-isbt', time: 2, line: 'blue' }, { stationId: 'karkarduma-court', time: 2, line: 'pink' }, { stationId: 'krishna-nagar', time: 2, line: 'pink' }] },
  { id: 'anand-vihar-isbt', name: 'Anand Vihar ISBT', lines: ['blue', 'pink'], connections: [{ stationId: 'karkarduma', time: 2, line: 'blue' }, { stationId: 'kaushambi', time: 2, line: 'blue' }, { stationId: 'karkarduma-court', time: 2, line: 'pink' }] },
  { id: 'kaushambi', name: 'Kaushambi', lines: ['blue'], connections: [{ stationId: 'anand-vihar-isbt', time: 2, line: 'blue' }, { stationId: 'vaishali', time: 2, line: 'blue' }] },
  { id: 'vaishali', name: 'Vaishali', lines: ['blue'], connections: [{ stationId: 'kaushambi', time: 2, line: 'blue' }] },
  // Blue Line main to Noida
  { id: 'akshardham', name: 'Akshardham', lines: ['blue'], connections: [{ stationId: 'yamuna-bank', time: 2, line: 'blue' }, { stationId: 'mayur-vihar-phase-1', time: 2, line: 'blue' }] },
  { id: 'mayur-vihar-phase-1', name: 'Mayur Vihar Phase-1', lines: ['blue', 'pink'], connections: [{ stationId: 'akshardham', time: 2, line: 'blue' }, { stationId: 'mayur-vihar-extension', time: 2, line: 'blue' }, { stationId: 'trilokpuri-sanjay-lake', time: 2, line: 'pink' }] },
  { id: 'mayur-vihar-extension', name: 'Mayur Vihar Extension', lines: ['blue'], connections: [{ stationId: 'mayur-vihar-phase-1', time: 2, line: 'blue' }, { stationId: 'new-ashok-nagar', time: 2, line: 'blue' }] },
  { id: 'new-ashok-nagar', name: 'New Ashok Nagar', lines: ['blue'], connections: [{ stationId: 'mayur-vihar-extension', time: 2, line: 'blue' }, { stationId: 'noida-sector-15', time: 2, line: 'blue' }] },
  { id: 'noida-sector-15', name: 'Noida Sector 15', lines: ['blue'], connections: [{ stationId: 'new-ashok-nagar', time: 2, line: 'blue' }, { stationId: 'noida-sector-16', time: 2, line: 'blue' }] },
  { id: 'noida-sector-16', name: 'Noida Sector 16', lines: ['blue'], connections: [{ stationId: 'noida-sector-15', time: 2, line: 'blue' }, { stationId: 'noida-sector-18', time: 2, line: 'blue' }] },
  { id: 'noida-sector-18', name: 'Noida Sector 18', lines: ['blue'], connections: [{ stationId: 'noida-sector-16', time: 2, line: 'blue' }, { stationId: 'botanical-garden', time: 2, line: 'blue' }] },
  { id: 'botanical-garden', name: 'Botanical Garden', lines: ['blue', 'magenta'], connections: [{ stationId: 'noida-sector-18', time: 2, line: 'blue' }, { stationId: 'golf-course', time: 2, line: 'blue' }, { stationId: 'okhla-bird-sanctuary', time: 3, line: 'magenta' }] },
  { id: 'golf-course', name: 'Golf Course', lines: ['blue'], connections: [{ stationId: 'botanical-garden', time: 2, line: 'blue' }, { stationId: 'noida-city-centre', time: 2, line: 'blue' }] },
  { id: 'noida-city-centre', name: 'Noida City Centre', lines: ['blue'], connections: [{ stationId: 'golf-course', time: 2, line: 'blue' }, { stationId: 'noida-sector-34', time: 2, line: 'blue' }] },
  { id: 'noida-sector-34', name: 'Noida Sector 34', lines: ['blue'], connections: [{ stationId: 'noida-city-centre', time: 2, line: 'blue' }, { stationId: 'noida-sector-52', time: 2, line: 'blue' }] },
  { id: 'noida-sector-52', name: 'Noida Sector 52', lines: ['blue'], connections: [{ stationId: 'noida-sector-34', time: 2, line: 'blue' }, { stationId: 'noida-sector-61', time: 2, line: 'blue' }] },
  { id: 'noida-sector-61', name: 'Noida Sector 61', lines: ['blue'], connections: [{ stationId: 'noida-sector-52', time: 2, line: 'blue' }, { stationId: 'noida-sector-59', time: 2, line: 'blue' }] },
  { id: 'noida-sector-59', name: 'Noida Sector 59', lines: ['blue'], connections: [{ stationId: 'noida-sector-61', time: 2, line: 'blue' }, { stationId: 'noida-sector-62', time: 2, line: 'blue' }] },
  { id: 'noida-sector-62', name: 'Noida Sector 62', lines: ['blue'], connections: [{ stationId: 'noida-sector-59', time: 2, line: 'blue' }, { stationId: 'noida-electronic-city', time: 2, line: 'blue' }] },
  { id: 'noida-electronic-city', name: 'Noida Electronic City', lines: ['blue'], connections: [{ stationId: 'noida-sector-62', time: 2, line: 'blue' }] },

  // Green Line (Kirti Nagar to Brigadier Hoshiar Singh)
  { id: 'satguru-ram-singh-marg', name: 'Satguru Ram Singh Marg', lines: ['green'], connections: [{ stationId: 'kirti-nagar', time: 2, line: 'green' }, { stationId: 'inderlok', time: 2, line: 'green' }] },
  { id: 'ashok-park-main', name: 'Ashok Park Main', lines: ['green'], connections: [{ stationId: 'inderlok', time: 2, line: 'green' }, { stationId: 'punjabi-bagh', time: 2, line: 'green' }] },
  { id: 'punjabi-bagh', name: 'Punjabi Bagh', lines: ['green'], connections: [{ stationId: 'ashok-park-main', time: 2, line: 'green' }, { stationId: 'shivaji-park', time: 2, line: 'green' }] },
  { id: 'shivaji-park', name: 'Shivaji Park', lines: ['green'], connections: [{ stationId: 'punjabi-bagh', time: 2, line: 'green' }, { stationId: 'madipur', time: 2, line: 'green' }] },
  { id: 'madipur', name: 'Madipur', lines: ['green'], connections: [{ stationId: 'shivaji-park', time: 2, line: 'green' }, { stationId: 'kirti-nagar', time: 2, line: 'green' }, { stationId: 'paschim-vihar-east', time: 2, line: 'green' }] },
  { id: 'paschim-vihar-east', name: 'Paschim Vihar East', lines: ['green'], connections: [{ stationId: 'madipur', time: 2, line: 'green' }, { stationId: 'paschim-vihar-west', time: 2, line: 'green' }] },
  { id: 'paschim-vihar-west', name: 'Paschim Vihar West', lines: ['green'], connections: [{ stationId: 'paschim-vihar-east', time: 2, line: 'green' }, { stationId: 'peeragarhi', time: 2, line: 'green' }] },
  { id: 'peeragarhi', name: 'Peeragarhi', lines: ['green'], connections: [{ stationId: 'paschim-vihar-west', time: 2, line: 'green' }, { stationId: 'udyog-nagar', time: 2, line: 'green' }] },
  { id: 'udyog-nagar', name: 'Udyog Nagar', lines: ['green'], connections: [{ stationId: 'peeragarhi', time: 2, line: 'green' }, { stationId: 'maharaja-surajmal-stadium', time: 2, line: 'green' }] },
  { id: 'maharaja-surajmal-stadium', name: 'Maharaja Surajmal Stadium', lines: ['green'], connections: [{ stationId: 'udyog-nagar', time: 2, line: 'green' }, { stationId: 'nangloi', time: 2, line: 'green' }] },
  { id: 'nangloi', name: 'Nangloi', lines: ['green'], connections: [{ stationId: 'maharaja-surajmal-stadium', time: 2, line: 'green' }, { stationId: 'nangloi-railway-station', time: 2, line: 'green' }] },
  { id: 'nangloi-railway-station', name: 'Nangloi Railway Station', lines: ['green'], connections: [{ stationId: 'nangloi', time: 2, line: 'green' }, { stationId: 'rajdhani-park-green', time: 2, line: 'green' }] },
  { id: 'rajdhani-park-green', name: 'Rajdhani Park', lines: ['green'], connections: [{ stationId: 'nangloi-railway-station', time: 2, line: 'green' }, { stationId: 'mundka', time: 2, line: 'green' }] },
  { id: 'mundka', name: 'Mundka', lines: ['green'], connections: [{ stationId: 'rajdhani-park-green', time: 2, line: 'green' }, { stationId: 'mundka-industrial-area', time: 2, line: 'green' }] },
  { id: 'mundka-industrial-area', name: 'Mundka Industrial Area', lines: ['green'], connections: [{ stationId: 'mundka', time: 2, line: 'green' }, { stationId: 'ghevra', time: 2, line: 'green' }] },
  { id: 'ghevra', name: 'Ghevra', lines: ['green'], connections: [{ stationId: 'mundka-industrial-area', time: 2, line: 'green' }, { stationId: 'tikri-kalan', time: 2, line: 'green' }] },
  { id: 'tikri-kalan', name: 'Tikri Kalan', lines: ['green'], connections: [{ stationId: 'ghevra', time: 2, line: 'green' }, { stationId: 'tikri-border', time: 2, line: 'green' }] },
  { id: 'tikri-border', name: 'Tikri Border', lines: ['green'], connections: [{ stationId: 'tikri-kalan', time: 2, line: 'green' }, { stationId: 'pandit-shree-ram-sharma', time: 2, line: 'green' }] },
  { id: 'pandit-shree-ram-sharma', name: 'Pandit Shree Ram Sharma', lines: ['green'], connections: [{ stationId: 'tikri-border', time: 2, line: 'green' }, { stationId: 'bahadurgarh-city', time: 2, line: 'green' }] },
  { id: 'bahadurgarh-city', name: 'Bahadurgarh City', lines: ['green'], connections: [{ stationId: 'pandit-shree-ram-sharma', time: 2, line: 'green' }, { stationId: 'brigadier-hoshiar-singh', time: 2, line: 'green' }] },
  { id: 'brigadier-hoshiar-singh', name: 'Brigadier Hoshiar Singh', lines: ['green'], connections: [{ stationId: 'bahadurgarh-city', time: 2, line: 'green' }] },

  // Violet Line (Kashmere Gate to Raja Nahar Singh)
  { id: 'lal-quila', name: 'Lal Quila', lines: ['violet'], connections: [{ stationId: 'kashmere-gate', time: 2, line: 'violet' }, { stationId: 'jama-masjid', time: 2, line: 'violet' }] },
  { id: 'jama-masjid', name: 'Jama Masjid', lines: ['violet'], connections: [{ stationId: 'lal-quila', time: 2, line: 'violet' }, { stationId: 'delhi-gate', time: 2, line: 'violet' }] },
  { id: 'delhi-gate', name: 'Delhi Gate', lines: ['violet'], connections: [{ stationId: 'jama-masjid', time: 2, line: 'violet' }, { stationId: 'ito', time: 2, line: 'violet' }] },
  { id: 'ito', name: 'ITO', lines: ['violet'], connections: [{ stationId: 'delhi-gate', time: 2, line: 'violet' }, { stationId: 'mandi-house', time: 2, line: 'violet' }] },
  { id: 'janpath', name: 'Janpath', lines: ['violet'], connections: [{ stationId: 'mandi-house', time: 2, line: 'violet' }, { stationId: 'central-secretariat', time: 2, line: 'violet' }] },
  { id: 'khan-market', name: 'Khan Market', lines: ['violet'], connections: [{ stationId: 'central-secretariat', time: 2, line: 'violet' }, { stationId: 'jawaharlal-nehru-stadium', time: 2, line: 'violet' }] },
  { id: 'jawaharlal-nehru-stadium', name: 'Jawaharlal Nehru Stadium', lines: ['violet'], connections: [{ stationId: 'khan-market', time: 2, line: 'violet' }, { stationId: 'jangpura', time: 2, line: 'violet' }] },
  { id: 'jangpura', name: 'Jangpura', lines: ['violet'], connections: [{ stationId: 'jawaharlal-nehru-stadium', time: 2, line: 'violet' }, { stationId: 'lajpat-nagar', time: 2, line: 'violet' }] },
  { id: 'lajpat-nagar', name: 'Lajpat Nagar', lines: ['violet', 'pink'], connections: [{ stationId: 'jangpura', time: 2, line: 'violet' }, { stationId: 'moolchand', time: 2, line: 'violet' }, { stationId: 'vinobapuri', time: 2, line: 'pink' }, { stationId: 'south-extension', time: 2, line: 'pink' }] },
  { id: 'moolchand', name: 'Moolchand', lines: ['violet'], connections: [{ stationId: 'lajpat-nagar', time: 2, line: 'violet' }, { stationId: 'kailash-colony', time: 2, line: 'violet' }] },
  { id: 'kailash-colony', name: 'Kailash Colony', lines: ['violet'], connections: [{ stationId: 'moolchand', time: 2, line: 'violet' }, { stationId: 'nehru-place', time: 2, line: 'violet' }] },
  { id: 'nehru-place', name: 'Nehru Place', lines: ['violet'], connections: [{ stationId: 'kailash-colony', time: 2, line: 'violet' }, { stationId: 'kalkaji-mandir', time: 2, line: 'violet' }] },
  { id: 'kalkaji-mandir', name: 'Kalkaji Mandir', lines: ['violet', 'magenta'], connections: [{ stationId: 'nehru-place', time: 2, line: 'violet' }, { stationId: 'govind-puri', time: 2, line: 'violet' }, { stationId: 'okhla-nsic', time: 2, line: 'magenta' }, { stationId: 'nehru-enclave', time: 2, line: 'magenta' }] },
  { id: 'govind-puri', name: 'Govind Puri', lines: ['violet'], connections: [{ stationId: 'kalkaji-mandir', time: 2, line: 'violet' }, { stationId: 'okhla', time: 2, line: 'violet' }] },
  { id: 'okhla', name: 'Okhla', lines: ['violet'], connections: [{ stationId: 'govind-puri', time: 2, line: 'violet' }, { stationId: 'jasola', time: 2, line: 'violet' }] },
  { id: 'jasola', name: 'Jasola', lines: ['violet'], connections: [{ stationId: 'okhla', time: 2, line: 'violet' }, { stationId: 'sarita-vihar', time: 2, line: 'violet' }] },
  { id: 'sarita-vihar', name: 'Sarita Vihar', lines: ['violet'], connections: [{ stationId: 'jasola', time: 2, line: 'violet' }, { stationId: 'mohan-estate', time: 2, line: 'violet' }] },
  { id: 'mohan-estate', name: 'Mohan Estate', lines: ['violet'], connections: [{ stationId: 'sarita-vihar', time: 2, line: 'violet' }, { stationId: 'tughlakabad', time: 2, line: 'violet' }] },
  { id: 'tughlakabad', name: 'Tughlakabad', lines: ['violet'], connections: [{ stationId: 'mohan-estate', time: 2, line: 'violet' }, { stationId: 'badarpur-border', time: 2, line: 'violet' }] },
  { id: 'badarpur-border', name: 'Badarpur Border', lines: ['violet'], connections: [{ stationId: 'tughlakabad', time: 2, line: 'violet' }, { stationId: 'sarai', time: 2, line: 'violet' }] },
  { id: 'sarai', name: 'Sarai', lines: ['violet'], connections: [{ stationId: 'badarpur-border', time: 2, line: 'violet' }, { stationId: 'nhpc-chowk', time: 2, line: 'violet' }] },
  { id: 'nhpc-chowk', name: 'NHPC Chowk', lines: ['violet'], connections: [{ stationId: 'sarai', time: 2, line: 'violet' }, { stationId: 'mewala-maharajpur', time: 2, line: 'violet' }] },
  { id: 'mewala-maharajpur', name: 'Mewala Maharajpur', lines: ['violet'], connections: [{ stationId: 'nhpc-chowk', time: 2, line: 'violet' }, { stationId: 'sector-28-faridabad', time: 2, line: 'violet' }] },
  { id: 'sector-28-faridabad', name: 'Sector 28', lines: ['violet'], connections: [{ stationId: 'mewala-maharajpur', time: 2, line: 'violet' }, { stationId: 'badkhal-mor', time: 2, line: 'violet' }] },
  { id: 'badkhal-mor', name: 'Badkhal Mor', lines: ['violet'], connections: [{ stationId: 'sector-28-faridabad', time: 2, line: 'violet' }, { stationId: 'old-faridabad', time: 2, line: 'violet' }] },
  { id: 'old-faridabad', name: 'Old Faridabad', lines: ['violet'], connections: [{ stationId: 'badkhal-mor', time: 2, line: 'violet' }, { stationId: 'neelam-chowk-ajronda', time: 2, line: 'violet' }] },
  { id: 'neelam-chowk-ajronda', name: 'Neelam Chowk Ajronda', lines: ['violet'], connections: [{ stationId: 'old-faridabad', time: 2, line: 'violet' }, { stationId: 'bata-chowk', time: 2, line: 'violet' }] },
  { id: 'bata-chowk', name: 'Bata Chowk', lines: ['violet'], connections: [{ stationId: 'neelam-chowk-ajronda', time: 2, line: 'violet' }, { stationId: 'escorts-mujesar', time: 2, line: 'violet' }] },
  { id: 'escorts-mujesar', name: 'Escorts Mujesar', lines: ['violet'], connections: [{ stationId: 'bata-chowk', time: 2, line: 'violet' }, { stationId: 'sant-surdas-sihi', time: 2, line: 'violet' }] },
  { id: 'sant-surdas-sihi', name: 'Sant Surdas (Sihi)', lines: ['violet'], connections: [{ stationId: 'escorts-mujesar', time: 2, line: 'violet' }, { stationId: 'raja-nahar-singh', time: 2, line: 'violet' }] },
  { id: 'raja-nahar-singh', name: 'Raja Nahar Singh (Ballabhgarh)', lines: ['violet'], connections: [{ stationId: 'sant-surdas-sihi', time: 2, line: 'violet' }] },

  // Pink Line (Majlis Park to Shiv Vihar)
  { id: 'majlis-park', name: 'Majlis Park', lines: ['pink'], connections: [{ stationId: 'azadpur', time: 3, line: 'pink' }] },
  { id: 'shalimar-bagh', name: 'Shalimar Bagh', lines: ['pink'], connections: [{ stationId: 'azadpur', time: 3, line: 'pink' }, { stationId: 'netaji-subhash-place', time: 3, line: 'pink' }] },
  { id: 'shakurpur', name: 'Shakurpur', lines: ['pink'], connections: [{ stationId: 'netaji-subhash-place', time: 3, line: 'pink' }, { stationId: 'punjabi-bagh-west', time: 2, line: 'pink' }] },
  { id: 'punjabi-bagh-west', name: 'Punjabi Bagh West', lines: ['pink'], connections: [{ stationId: 'shakurpur', time: 2, line: 'pink' }, { stationId: 'rajouri-garden', time: 3, line: 'pink' }] },
  { id: 'mayapuri', name: 'Mayapuri', lines: ['pink'], connections: [{ stationId: 'rajouri-garden', time: 3, line: 'pink' }, { stationId: 'naraina-vihar', time: 2, line: 'pink' }] },
  { id: 'naraina-vihar', name: 'Naraina Vihar', lines: ['pink'], connections: [{ stationId: 'mayapuri', time: 2, line: 'pink' }, { stationId: 'delhi-cantt', time: 2, line: 'pink' }] },
  { id: 'delhi-cantt', name: 'Delhi Cantt', lines: ['pink'], connections: [{ stationId: 'naraina-vihar', time: 2, line: 'pink' }, { stationId: 'durgabai-deshmukh-south-campus', time: 2, line: 'pink' }] },
  { id: 'durgabai-deshmukh-south-campus', name: 'Durgabai Deshmukh South Campus', lines: ['pink'], connections: [{ stationId: 'delhi-cantt', time: 2, line: 'pink' }, { stationId: 'sir-vishweshwaraiah-moti-bagh', time: 2, line: 'pink' }] },
  { id: 'sir-vishweshwaraiah-moti-bagh', name: 'Sir Vishweshwaraiah Moti Bagh', lines: ['pink'], connections: [{ stationId: 'durgabai-deshmukh-south-campus', time: 2, line: 'pink' }, { stationId: 'bhikaji-cama-place', time: 2, line: 'pink' }] },
  { id: 'bhikaji-cama-place', name: 'Bhikaji Cama Place', lines: ['pink'], connections: [{ stationId: 'sir-vishweshwaraiah-moti-bagh', time: 2, line: 'pink' }, { stationId: 'sarojini-nagar', time: 2, line: 'pink' }] },
  { id: 'sarojini-nagar', name: 'Sarojini Nagar', lines: ['pink'], connections: [{ stationId: 'bhikaji-cama-place', time: 2, line: 'pink' }, { stationId: 'dilli-haat-ina', time: 2, line: 'pink' }] },
  { id: 'dilli-haat-ina', name: 'Dilli Haat - INA', lines: ['pink'], connections: [{ stationId: 'sarojini-nagar', time: 2, line: 'pink' }, { stationId: 'ina', time: 2, line: 'pink' }] },
  { id: 'south-extension', name: 'South Extension', lines: ['pink'], connections: [{ stationId: 'ina', time: 3, line: 'pink' }, { stationId: 'lajpat-nagar', time: 2, line: 'pink' }] },
  { id: 'vinobapuri', name: 'Vinobapuri', lines: ['pink'], connections: [{ stationId: 'lajpat-nagar', time: 2, line: 'pink' }, { stationId: 'ashram', time: 2, line: 'pink' }] },
  { id: 'ashram', name: 'Ashram', lines: ['pink'], connections: [{ stationId: 'vinobapuri', time: 2, line: 'pink' }, { stationId: 'hazrat-nizamuddin', time: 2, line: 'pink' }] },
  { id: 'hazrat-nizamuddin', name: 'Hazrat Nizamuddin', lines: ['pink'], connections: [{ stationId: 'ashram', time: 2, line: 'pink' }, { stationId: 'okhla-vihar', time: 2, line: 'pink' }] },
  { id: 'okhla-vihar', name: 'Okhla Vihar', lines: ['pink'], connections: [{ stationId: 'hazrat-nizamuddin', time: 2, line: 'pink' }, { stationId: 'jamia-millia-islamia', time: 2, line: 'pink' }] },
  { id: 'jamia-millia-islamia', name: 'Jamia Millia Islamia', lines: ['pink'], connections: [{ stationId: 'okhla-vihar', time: 2, line: 'pink' }, { stationId: 'sukhdev-vihar', time: 2, line: 'pink' }] },
  { id: 'sukhdev-vihar', name: 'Sukhdev Vihar', lines: ['pink'], connections: [{ stationId: 'jamia-millia-islamia', time: 2, line: 'pink' }, { stationId: 'okhla-nsic', time: 2, line: 'pink' }] },
  { id: 'okhla-nsic', name: 'Okhla NSIC', lines: ['pink'], connections: [{ stationId: 'sukhdev-vihar', time: 2, line: 'pink' }, { stationId: 'kalindi-kunj', time: 2, line: 'pink' }] },
  { id: 'kalindi-kunj', name: 'Kalindi Kunj', lines: ['pink'], connections: [{ stationId: 'okhla-nsic', time: 2, line: 'pink' }, { stationId: 'jasola-vihar-shaheen-bagh', time: 2, line: 'pink' }] },
  { id: 'jasola-vihar-shaheen-bagh', name: 'Jasola Vihar Shaheen Bagh', lines: ['pink'], connections: [{ stationId: 'kalindi-kunj', time: 2, line: 'pink' }] },
  // Pink Line Northern Extension
  { id: 'gulabi-bagh', name: 'Gulabi Bagh', lines: ['pink'], connections: [{ stationId: 'azadpur', time: 3, line: 'pink' }, { stationId: 'shastri-nagar-pink', time: 2, line: 'pink' }] },
  { id: 'shastri-nagar-pink', name: 'Shastri Nagar', lines: ['pink'], connections: [{ stationId: 'gulabi-bagh', time: 2, line: 'pink' }, { stationId: 'ghanta-ghar', time: 2, line: 'pink' }] },
  { id: 'ghanta-ghar', name: 'Ghanta Ghar', lines: ['pink'], connections: [{ stationId: 'shastri-nagar-pink', time: 2, line: 'pink' }, { stationId: 'pulbangash-pink', time: 2, line: 'pink' }] },
  { id: 'pulbangash-pink', name: 'Pulbangash', lines: ['pink'], connections: [{ stationId: 'ghanta-ghar', time: 2, line: 'pink' }, { stationId: 'lahori-gate', time: 2, line: 'pink' }] },
  { id: 'lahori-gate', name: 'Lahori Gate', lines: ['pink'], connections: [{ stationId: 'pulbangash-pink', time: 2, line: 'pink' }, { stationId: 'delhi-main', time: 2, line: 'pink' }] },
  { id: 'delhi-main', name: 'Delhi Main (Ajmeri Gate)', lines: ['pink'], connections: [{ stationId: 'lahori-gate', time: 2, line: 'pink' }] },
  // Pink Line Eastern Extension
  { id: 'trilokpuri-sanjay-lake', name: 'Trilokpuri Sanjay Lake', lines: ['pink'], connections: [{ stationId: 'mayur-vihar-phase-1', time: 2, line: 'pink' }, { stationId: 'east-vinod-nagar', time: 2, line: 'pink' }] },
  { id: 'east-vinod-nagar', name: 'East Vinod Nagar', lines: ['pink'], connections: [{ stationId: 'trilokpuri-sanjay-lake', time: 2, line: 'pink' }, { stationId: 'mandawali-fazilpur', time: 2, line: 'pink' }] },
  { id: 'mandawali-fazilpur', name: 'Mandawali Fazilpur', lines: ['pink'], connections: [{ stationId: 'east-vinod-nagar', time: 2, line: 'pink' }, { stationId: 'ip-extension', time: 2, line: 'pink' }] },
  { id: 'ip-extension', name: 'IP Extension', lines: ['pink'], connections: [{ stationId: 'mandawali-fazilpur', time: 2, line: 'pink' }, { stationId: 'krishna-nagar', time: 2, line: 'pink' }] },
  { id: 'krishna-nagar', name: 'Krishna Nagar', lines: ['pink'], connections: [{ stationId: 'ip-extension', time: 2, line: 'pink' }, { stationId: 'karkarduma', time: 2, line: 'pink' }] },
  { id: 'karkarduma-court', name: 'Karkarduma Court', lines: ['pink'], connections: [{ stationId: 'karkarduma', time: 2, line: 'pink' }, { stationId: 'anand-vihar-isbt', time: 2, line: 'pink' }] },
  { id: 'jaffrabad', name: 'Jaffrabad', lines: ['pink'], connections: [{ stationId: 'welcome', time: 2, line: 'pink' }, { stationId: 'maujpur-babarpur', time: 2, line: 'pink' }] },
  { id: 'maujpur-babarpur', name: 'Maujpur-Babarpur', lines: ['pink'], connections: [{ stationId: 'jaffrabad', time: 2, line: 'pink' }, { stationId: 'welcome', time: 2, line: 'pink' }, { stationId: 'gokulpuri', time: 2, line: 'pink' }] },
  { id: 'gokulpuri', name: 'Gokulpuri', lines: ['pink'], connections: [{ stationId: 'maujpur-babarpur', time: 2, line: 'pink' }, { stationId: 'johri-enclave', time: 2, line: 'pink' }] },
  { id: 'johri-enclave', name: 'Johri Enclave', lines: ['pink'], connections: [{ stationId: 'gokulpuri', time: 2, line: 'pink' }, { stationId: 'shiv-vihar', time: 2, line: 'pink' }] },
  { id: 'shiv-vihar', name: 'Shiv Vihar', lines: ['pink'], connections: [{ stationId: 'johri-enclave', time: 2, line: 'pink' }] },

  // Magenta Line (Botanical Garden to Janakpuri West)
  { id: 'okhla-bird-sanctuary', name: 'Okhla Bird Sanctuary', lines: ['magenta'], connections: [{ stationId: 'botanical-garden', time: 3, line: 'magenta' }, { stationId: 'kalindi-kunj-magenta', time: 2, line: 'magenta' }] },
  { id: 'kalindi-kunj-magenta', name: 'Kalindi Kunj', lines: ['magenta'], connections: [{ stationId: 'okhla-bird-sanctuary', time: 2, line: 'magenta' }, { stationId: 'jasola-vihar-shaheen-bagh-magenta', time: 2, line: 'magenta' }] },
  { id: 'jasola-vihar-shaheen-bagh-magenta', name: 'Jasola Vihar Shaheen Bagh', lines: ['magenta'], connections: [{ stationId: 'kalindi-kunj-magenta', time: 2, line: 'magenta' }, { stationId: 'okhla-nsic-magenta', time: 2, line: 'magenta' }] },
  { id: 'okhla-nsic-magenta', name: 'Okhla NSIC', lines: ['magenta'], connections: [{ stationId: 'jasola-vihar-shaheen-bagh-magenta', time: 2, line: 'magenta' }, { stationId: 'kalkaji-mandir', time: 2, line: 'magenta' }] },
  { id: 'nehru-enclave', name: 'Nehru Enclave', lines: ['magenta'], connections: [{ stationId: 'kalkaji-mandir', time: 2, line: 'magenta' }, { stationId: 'greater-kailash', time: 2, line: 'magenta' }] },
  { id: 'greater-kailash', name: 'Greater Kailash', lines: ['magenta'], connections: [{ stationId: 'nehru-enclave', time: 2, line: 'magenta' }, { stationId: 'chirag-delhi', time: 2, line: 'magenta' }] },
  { id: 'chirag-delhi', name: 'Chirag Delhi', lines: ['magenta'], connections: [{ stationId: 'greater-kailash', time: 2, line: 'magenta' }, { stationId: 'panchsheel-park', time: 2, line: 'magenta' }] },
  { id: 'panchsheel-park', name: 'Panchsheel Park', lines: ['magenta'], connections: [{ stationId: 'chirag-delhi', time: 2, line: 'magenta' }, { stationId: 'hauz-khas', time: 3, line: 'magenta' }] },
  { id: 'iit-delhi', name: 'IIT Delhi', lines: ['magenta'], connections: [{ stationId: 'hauz-khas', time: 3, line: 'magenta' }, { stationId: 'r-k-puram', time: 2, line: 'magenta' }] },
  { id: 'r-k-puram', name: 'R.K. Puram', lines: ['magenta'], connections: [{ stationId: 'iit-delhi', time: 2, line: 'magenta' }, { stationId: 'munirka', time: 2, line: 'magenta' }] },
  { id: 'munirka', name: 'Munirka', lines: ['magenta'], connections: [{ stationId: 'r-k-puram', time: 2, line: 'magenta' }, { stationId: 'vasant-vihar', time: 2, line: 'magenta' }] },
  { id: 'vasant-vihar', name: 'Vasant Vihar', lines: ['magenta'], connections: [{ stationId: 'munirka', time: 2, line: 'magenta' }, { stationId: 'shankar-vihar', time: 2, line: 'magenta' }] },
  { id: 'shankar-vihar', name: 'Shankar Vihar', lines: ['magenta'], connections: [{ stationId: 'vasant-vihar', time: 2, line: 'magenta' }, { stationId: 'terminal-1-igi-airport', time: 3, line: 'magenta' }] },
  { id: 'terminal-1-igi-airport', name: 'Terminal 1 - IGI Airport', lines: ['magenta'], connections: [{ stationId: 'shankar-vihar', time: 3, line: 'magenta' }, { stationId: 'sadar-bazar-cantonment', time: 2, line: 'magenta' }, { stationId: 'janakpuri-west', time: 4, line: 'magenta' }] },
  { id: 'sadar-bazar-cantonment', name: 'Sadar Bazar Cantonment', lines: ['magenta'], connections: [{ stationId: 'terminal-1-igi-airport', time: 2, line: 'magenta' }, { stationId: 'palam', time: 2, line: 'magenta' }] },
  { id: 'palam', name: 'Palam', lines: ['magenta'], connections: [{ stationId: 'sadar-bazar-cantonment', time: 2, line: 'magenta' }, { stationId: 'dabri-mor-janakpuri-south', time: 2, line: 'magenta' }] },
  { id: 'dabri-mor-janakpuri-south', name: 'Dabri Mor - Janakpuri South', lines: ['magenta'], connections: [{ stationId: 'palam', time: 2, line: 'magenta' }, { stationId: 'janakpuri-west', time: 3, line: 'magenta' }] },

  // Grey Line (Dwarka to Dhansa Bus Stand)
  { id: 'dwarka-grey', name: 'Dwarka', lines: ['grey'], connections: [{ stationId: 'nangli', time: 2, line: 'grey' }] },
  { id: 'nangli', name: 'Nangli', lines: ['grey'], connections: [{ stationId: 'dwarka-grey', time: 2, line: 'grey' }, { stationId: 'najafgarh', time: 2, line: 'grey' }] },
  { id: 'najafgarh', name: 'Najafgarh', lines: ['grey'], connections: [{ stationId: 'nangli', time: 2, line: 'grey' }, { stationId: 'dhansa-bus-stand', time: 2, line: 'grey' }] },
  { id: 'dhansa-bus-stand', name: 'Dhansa Bus Stand', lines: ['grey'], connections: [{ stationId: 'najafgarh', time: 2, line: 'grey' }] },

  // Orange Line (Airport Express)
  { id: 'shivaji-stadium', name: 'Shivaji Stadium', lines: ['orange'], connections: [{ stationId: 'new-delhi', time: 3, line: 'orange' }, { stationId: 'dhaula-kuan', time: 4, line: 'orange' }] },
  { id: 'dhaula-kuan', name: 'Dhaula Kuan', lines: ['orange'], connections: [{ stationId: 'shivaji-stadium', time: 4, line: 'orange' }, { stationId: 'delhi-aerocity', time: 4, line: 'orange' }] },
  { id: 'delhi-aerocity', name: 'Delhi Aerocity', lines: ['orange'], connections: [{ stationId: 'dhaula-kuan', time: 4, line: 'orange' }, { stationId: 'igi-airport-t3', time: 3, line: 'orange' }] },
  { id: 'igi-airport-t3', name: 'IGI Airport (T3)', lines: ['orange'], connections: [{ stationId: 'delhi-aerocity', time: 3, line: 'orange' }, { stationId: 'dwarka-sector-21-orange', time: 5, line: 'orange' }] },
  { id: 'dwarka-sector-21-orange', name: 'Dwarka Sector 21', lines: ['orange'], connections: [{ stationId: 'igi-airport-t3', time: 5, line: 'orange' }, { stationId: 'yashobhoomi-dwarka-sector-25', time: 3, line: 'orange' }] },
  { id: 'yashobhoomi-dwarka-sector-25', name: 'Yashobhoomi Dwarka Sector 25', lines: ['orange'], connections: [{ stationId: 'dwarka-sector-21-orange', time: 3, line: 'orange' }] },

  // Aqua Line (Noida Metro)
  { id: 'noida-sector-51', name: 'Noida Sector 51', lines: ['aqua'], connections: [{ stationId: 'noida-sector-50', time: 2, line: 'aqua' }] },
  { id: 'noida-sector-50', name: 'Noida Sector 50', lines: ['aqua'], connections: [{ stationId: 'noida-sector-51', time: 2, line: 'aqua' }, { stationId: 'noida-sector-76', time: 2, line: 'aqua' }] },
  { id: 'noida-sector-76', name: 'Noida Sector 76', lines: ['aqua'], connections: [{ stationId: 'noida-sector-50', time: 2, line: 'aqua' }, { stationId: 'noida-sector-101', time: 2, line: 'aqua' }] },
  { id: 'noida-sector-101', name: 'Noida Sector 101', lines: ['aqua'], connections: [{ stationId: 'noida-sector-76', time: 2, line: 'aqua' }, { stationId: 'noida-sector-81', time: 2, line: 'aqua' }] },
  { id: 'noida-sector-81', name: 'Noida Sector 81', lines: ['aqua'], connections: [{ stationId: 'noida-sector-101', time: 2, line: 'aqua' }, { stationId: 'nsez', time: 2, line: 'aqua' }] },
  { id: 'nsez', name: 'NSEZ', lines: ['aqua'], connections: [{ stationId: 'noida-sector-81', time: 2, line: 'aqua' }, { stationId: 'noida-sector-83', time: 2, line: 'aqua' }] },
  { id: 'noida-sector-83', name: 'Noida Sector 83', lines: ['aqua'], connections: [{ stationId: 'nsez', time: 2, line: 'aqua' }, { stationId: 'noida-sector-137', time: 2, line: 'aqua' }] },
  { id: 'noida-sector-137', name: 'Noida Sector 137', lines: ['aqua'], connections: [{ stationId: 'noida-sector-83', time: 2, line: 'aqua' }, { stationId: 'noida-sector-142', time: 2, line: 'aqua' }] },
  { id: 'noida-sector-142', name: 'Noida Sector 142', lines: ['aqua'], connections: [{ stationId: 'noida-sector-137', time: 2, line: 'aqua' }, { stationId: 'noida-sector-143', time: 2, line: 'aqua' }] },
  { id: 'noida-sector-143', name: 'Noida Sector 143', lines: ['aqua'], connections: [{ stationId: 'noida-sector-142', time: 2, line: 'aqua' }, { stationId: 'noida-sector-144', time: 2, line: 'aqua' }] },
  { id: 'noida-sector-144', name: 'Noida Sector 144', lines: ['aqua'], connections: [{ stationId: 'noida-sector-143', time: 2, line: 'aqua' }, { stationId: 'noida-sector-145', time: 2, line: 'aqua' }] },
  { id: 'noida-sector-145', name: 'Noida Sector 145', lines: ['aqua'], connections: [{ stationId: 'noida-sector-144', time: 2, line: 'aqua' }, { stationId: 'noida-sector-146', time: 2, line: 'aqua' }] },
  { id: 'noida-sector-146', name: 'Noida Sector 146', lines: ['aqua'], connections: [{ stationId: 'noida-sector-145', time: 2, line: 'aqua' }, { stationId: 'noida-sector-147', time: 2, line: 'aqua' }] },
  { id: 'noida-sector-147', name: 'Noida Sector 147', lines: ['aqua'], connections: [{ stationId: 'noida-sector-146', time: 2, line: 'aqua' }, { stationId: 'noida-sector-148', time: 2, line: 'aqua' }] },
  { id: 'noida-sector-148', name: 'Noida Sector 148', lines: ['aqua'], connections: [{ stationId: 'noida-sector-147', time: 2, line: 'aqua' }, { stationId: 'knowledge-park-2', time: 2, line: 'aqua' }] },
  { id: 'knowledge-park-2', name: 'Knowledge Park II', lines: ['aqua'], connections: [{ stationId: 'noida-sector-148', time: 2, line: 'aqua' }, { stationId: 'pari-chowk', time: 2, line: 'aqua' }] },
  { id: 'pari-chowk', name: 'Pari Chowk', lines: ['aqua'], connections: [{ stationId: 'knowledge-park-2', time: 2, line: 'aqua' }, { stationId: 'alpha-1', time: 2, line: 'aqua' }] },
  { id: 'alpha-1', name: 'Alpha 1', lines: ['aqua'], connections: [{ stationId: 'pari-chowk', time: 2, line: 'aqua' }, { stationId: 'delta-1', time: 2, line: 'aqua' }] },
  { id: 'delta-1', name: 'Delta 1', lines: ['aqua'], connections: [{ stationId: 'alpha-1', time: 2, line: 'aqua' }, { stationId: 'gnida-office', time: 2, line: 'aqua' }] },
  { id: 'gnida-office', name: 'GNIDA Office', lines: ['aqua'], connections: [{ stationId: 'delta-1', time: 2, line: 'aqua' }, { stationId: 'depot', time: 2, line: 'aqua' }] },
  { id: 'depot', name: 'Depot', lines: ['aqua'], connections: [{ stationId: 'gnida-office', time: 2, line: 'aqua' }] },
];

// Helper function to get station by ID
export const getStationById = (id: string): Station | undefined => {
  return stations.find(station => station.id === id);
};

// Helper function to get all stations sorted by name
export const getAllStationsSorted = (): Station[] => {
  return [...stations].sort((a, b) => a.name.localeCompare(b.name));
};

// Helper to get line color
export const getLineColor = (line: MetroLine): string => {
  const lineInfo = metroLines.find(l => l.id === line);
  return lineInfo?.color || 'hsl(0, 0%, 50%)';
};

// Helper to get line name
export const getLineName = (line: MetroLine): string => {
  const lineInfo = metroLines.find(l => l.id === line);
  return lineInfo?.name || line;
};
