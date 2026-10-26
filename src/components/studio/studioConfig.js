/**
 * Shared station metadata for the 3D studio and its React HUD.
 * Positions are world-space X/Z coordinates. Y is intentionally omitted:
 * the engine places labels and markers at curated heights.
 */
export const STUDIO_STATIONS = [
  {
    id: 'about',
    order: 1,
    label: 'About Me',
    shortLabel: 'About',
    tagline: 'The desk',
    subtitle: 'Station 01 · The desk',
    description: 'Who I am, how I work, and the road that got me here.',
    accent: '#FE7F2D',
    anchor: [-4.6, -3.15],
    approach: [-4.6, -2.8],
    radius: 2.2,
    marker: [-4.6, -3.15],
    labelPosition: [-4.6, 4.25, -5.5],
  },
  {
    id: 'projects',
    order: 2,
    label: 'Projects',
    shortLabel: 'Work',
    tagline: 'Gallery wall',
    subtitle: 'Station 02 · Gallery wall',
    description: 'Case studies from the workbench — products, platforms, and experiments.',
    accent: '#A78BFA',
    anchor: [-7.9, 0],
    approach: [-7.25, 0],
    radius: 2.2,
    marker: [-7.9, 0],
    labelPosition: [-7.55, 5.55, 0],
  },
  {
    id: 'skills',
    order: 3,
    label: 'Skills',
    shortLabel: 'Stack',
    tagline: 'Server rack',
    subtitle: 'Station 03 · Server rack',
    description: 'The languages, frameworks, and infrastructure behind the work.',
    accent: '#22D3EE',
    anchor: [5.8, -4.7],
    approach: [5.8, -4.1],
    radius: 2.1,
    marker: [5.8, -4.7],
    labelPosition: [5.8, 5.5, -6.2],
  },
  {
    id: 'contact',
    order: 4,
    label: 'Contact',
    shortLabel: 'Contact',
    tagline: 'Mailbox',
    subtitle: 'Station 04 · Mailbox',
    description: 'Send a note, book a call, or grab the resume.',
    accent: '#4ADE80',
    anchor: [6.8, 3.15],
    approach: [6.8, 2.75],
    radius: 2.1,
    marker: [6.8, 3.15],
    labelPosition: [6.8, 4.35, 4.8],
  },
];

export const STATION_MAP = Object.fromEntries(
  STUDIO_STATIONS.map((station) => [station.id, station])
);

export const STATION_IDS = STUDIO_STATIONS.map((station) => station.id);
