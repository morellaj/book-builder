// eslint-disable-next-line import/prefer-default-export
export const scenes = [
  [
    { item: 'kate-house' },
    { item: 'table', left: 91, bottom: 33 },
    { item: 'green-backpack', left: 130, bottom: 118 },
    { item: 'book', left: 188, bottom: 110 },
    { item: 'pencil', left: 253, bottom: 105 },
    { character: 'kate', left: 801, bottom: 30 },
    {
      left: 801,
      bottom: 30,
      color: 'kate',
      text:
        [
          'Yaaawwwnn...', 'Time to get ready for school.',
        ],
    },
  ],
  [
    { item: 'kate-house' },
    { item: 'table', left: 91, bottom: 33 },
    { character: 'kate', left: 338, bottom: 30 },
    { item: 'green-backpack', left: 348, bottom: 30 },
    {
      left: 338,
      bottom: 30,
      color: 'kate',
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
      left: 840,
      bottom: 130,
      text:
        [
          'Kate, what are you doing?',
        ],
    },
  ],
];
