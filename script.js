const cardbox=document.getElementById('cardbox')
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('Asideber');


hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
});

const Asideber = document.getElementById('Asideber');

const loadCategory = () => {
  fetch('https://openapi.programming-hero.com/api/categories')
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      showCategory(categories);
    })
    .catch((error) => {
      console.error('Error fetching categories:', error);
    });

  const showCategory = (cat) => {
    cat.forEach((category) => {
      const liName = category.category_name;
      const liId = category.id;

      const li = document.createElement('li');
      li.id = liId;

      const a = document.createElement('a');
      a.href = '#';
      a.className =
        'block text-gray-800 hover:bg-green-700 cursor-pointer hover:text-white px-3 py-2 w-[10rem] rounded';
      a.textContent = liName;

      a.addEventListener('click', (e) => {
        const allLinks = Asideber.querySelectorAll('a');
        allLinks.forEach((link) => {
          link.style.backgroundColor = '';
          link.style.color = '';
        });

        e.target.style.backgroundColor = 'green';
        e.target.style.color = 'white';

        // console.log('Clicked category id:', liId);
        // console.log(liId);
        lodcardByCategory(liId);
      });

      li.appendChild(a);
      Asideber.appendChild(li);
    });
  };
};

const lodcardByCategory = (cardId) => {
  console.log(cardId);
  
  fetch(`https://openapi.programming-hero.com/api/category/${cardId}`).then(res => res.json()).then(data => {
    console.log(data);
    displaycard(data.plants)
  })
    .catch((erron => {
      console.log(erron);
      
    }));
  
};
const displaycard = (cards) => {
  // console.log(cards);
  
  cards.forEach((card) => {
    cardbox.innerHTML += `<div>\
    <img src="${card.image}
">    <h1>${card.price}</h1>
    </div>`;
    
  });
};


loadCategory();
