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

  addEventListeners();
}

function dragStart() {
  //   console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  console.log(dragStartIndex);
}
function dragEnter() {
  //   console.log('Event: ', 'dragenter');
  this.classList.add('over');
}
function dragLeave() {
  //   console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}
function dragOver(e) {
  //   console.log('Event: ', 'dragover');
  e.preventDefault();
}
function dragDrop() {
  //   console.log('Event: ', 'drop');
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const corpName = listItem.querySelector('.draggable').innerText.trim();
    if (corpName !== marketCapitalizationRanking[index]) {
      listItem.classList.add('wrong');
      listItem.classList.remove('right');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');
  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });
  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);
