// eslint-disable-next-line import/prefer-default-export
export const scenes = [
  [
    { item: 'kate-house' },
    { item: 'table', left: 192, bottom: 66 },
    { item: 'green-backpack', left: 130, bottom: 118 },
    { item: 'book', left: 188, bottom: 110 },
    { item: 'pencil', left: 253, bottom: 105 },
    { character: 'kate', left: 854, bottom: 93 },
    {
      tLeft: 854,
      tBottom: 93,
      color: 'kate',
      text:
        [
          'Yaaawwwnn...', 'Time to get ready for school.',
        ],
    },
  ],
  [
    { item: 'kate-house' },
    { item: 'table', left: 192, bottom: 66 },
    { character: 'kate', left: 600, bottom: 0 },
    { item: 'green-backpack', left: 321, bottom: 78 },
    {
      left: 500,
      bottom: 250,
      target: 'kate',
      size: ['huge', 'small'],
      maxWidth: 400,
      padding: ['huge', 'standard'],
      text:
        [
          "Okay, let's see...", 'Got my backpack, book, pencil...',
        ],
    },
  ],
  [
    { item: 'kate-house' },
    { item: 'table', left: 91, bottom: 33 },
    {
      character: 'kate-unsure', left: 338, bottom: 30, reflect: true,
    },
    {
      item: 'green-backpack', left: 348, bottom: 30, reflect: true,
    },
    {
      tLeft: 840,
      tBottom: 130,
      text:
        [
          'Kate, what are you doing?',
        ],
    },
  ],
];
