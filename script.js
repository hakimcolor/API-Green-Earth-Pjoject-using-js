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
        'block text-gray-800 hover:bg-green-700 cursor-pointer hover:text-white px-3 py-2 rounded';
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
  
  cards.forEach((plant) => {
    cardbox.innerHTML += `
    <div class="w-80 bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100 mt-5">
 
  <div class="bg-gray-100 h-40 flex items-center justify-center">
    <img 
      src="${plant.image}" 
      alt="${plant.name}" 
      class="w-full h-full object-cover  rounded-t-2xl p-2 bg-white"
    />
  </div>

  <!-- Content -->
  <div class="p-4">
    <!-- Title -->
    <h2 onclick="loadSinglePlant('${plant.id}')" 
        class="text-lg font-semibold text-gray-900">
      ${plant.name}
    </h2>

    <!-- Description -->
    <p class="text-sm text-gray-600 mt-1">
      ${
        plant.description
          ? plant.description.slice(0, 100) + '...'
          : 'No description available.'
      }
    </p>

    
    <div class="flex items-center justify-between mt-3">
      <span class="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
        ${plant.category}
      </span>
      <span class="text-lg font-bold text-gray-900"><span class='text-3xl font-bold'>৳</span>${
        plant.price
      }</span>
    </div>

    <!-- Add to Cart -->
    <button onclick="addToCart('${plant.id}')"
      class="w-full bg-green-700 hover:bg-green-800 transition text-white font-medium rounded-full py-2 mt-4">
      Add to Cart
    </button>
  </div>
</div>


      `;
    
  });
};


loadCategory();
