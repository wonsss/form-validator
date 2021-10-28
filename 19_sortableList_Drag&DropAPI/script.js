const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');
const marketCapitalizationRanking = [
  '삼성전자',
  'SK하이닉스',
  'NAVER',
  'LG화학',
  '삼성바이오로직스',
  '카카오',
  '삼성전자우',
  '삼성SDI',
  '현대차',
  '기아',
];

// Store listItems
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  [...marketCapitalizationRanking]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((corp, index) => {
      const listItem = document.createElement('li');
      //   listItem.classList.add('over');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="corp-name">${corp}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;
      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });
}
