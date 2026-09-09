export const specialtyPizzaPrices = [
  { size: '10" Small, Small Thin', price: "$19.99" },
  { size: '12" Medium, Medium Thin, Heart Shaped', price: "$24.99" },
  { size: '12" Gluten Free Vegan / Cauliflower Crust', price: "$25.99" },
  { size: '14" Large, Large Thin', price: "$31.99" },
  { size: '18" Extra Large, Extra Large Thin', price: "$41.99" },
];

export const cyoPrices = [
  { size: '10" Small, Small Thin', price: "$16.99" },
  { size: '12" Medium, Medium Thin', price: "$21.99" },
  { size: '12" Gluten Free, Cauliflower Crust', price: "$22.99" },
  { size: '14" Large, Large Thin', price: "$25.99" },
  { size: '18" Extra Large, Extra Large Thin', price: "$31.99" },
];

export const featuredCategories = [
  {
    id: "indian",
    name: "Indian pizzas",
    summary:
      "Butter sauce, curry, tikka, and tandoori on a pizza crust — paneer, chicken, and lamb.",
    points: ["Butter Chicken", "Butter Paneer", "Tandoori Chicken", "Lamb Curry (Halal)"],
    href: "/menu#indian-veg",
    inverse: false,
  },
  {
    id: "classics",
    name: "The Classics",
    summary:
      "Red sauce, garlic white, BBQ, pesto, and buffalo builds — veggie, pepperoni, and meat pies.",
    points: ["Margherita", "Combination", "Hawaiian", "Craft Your Own"],
    href: "/menu#classics",
    inverse: true,
  },
  {
    id: "starters",
    name: "Starters & sides",
    summary:
      "Street-food snacks next to garlic bread, wings, and pasta.",
    points: ["Potato Samosa", "Pani Puri", "Garlic Bread with Cheese", "Wings"],
    href: "/menu#appetizers",
    inverse: false,
  },
  {
    id: "dietary",
    name: "Jain, vegan & Halal",
    summary:
      "Jain pies (no onion or garlic), vegan pizzas on a 12\" gluten-free crust, and a Halal menu.",
    points: ["Jain Paneer", "Vegan Indian Veggie", "Halal Butter Chicken"],
    href: "/menu#vegan",
    inverse: true,
  },
];

export const menuSections = [
  {
    id: "classics",
    title: "The Classics",
    items: [
      {
        name: "Classic Veggie",
        description:
          "Red sauce, cheese, mushrooms, green bell peppers, red onions, tomatoes, black olives, and artichokes.",
      },
      {
        name: "Garden Delight",
        description:
          "Garlic white sauce (contains egg), spinach, cheese, mushrooms, red onions, tomatoes, artichokes, garlic, and green onions.",
      },
      {
        name: "Margherita Pizza",
        description:
          "Red sauce, basil, tomatoes, garlic, and extra cheese.",
      },
      {
        name: "Pepperoni Chicken Tikka",
        description:
          "Chef special sauce (contains dairy), mozzarella, pepperoni, and chicken tikka.",
      },
      {
        name: "American Classic",
        description:
          "Red sauce, cheese, pepperoni, mushrooms, and sausage.",
      },
      {
        name: "BBQ Chicken Combination",
        description:
          "BBQ sauce, cheese, grilled chicken, bacon, and pineapple.",
      },
      {
        name: "Buffalo Chicken",
        description:
          "Garlic white sauce, cheese, red onions, tomatoes, and buffalo chicken.",
      },
      {
        name: "Chicken Bacon Supreme",
        description:
          "Garlic white sauce, cheese, grilled chicken, bacon, tomatoes, and green onions.",
      },
      {
        name: "Combination",
        description:
          "Red sauce, cheese, salami, pepperoni, green bell peppers, red onions, black olives, beef, and sausage.",
      },
      {
        name: "Garlic Chicken Supreme",
        description:
          "Garlic white sauce, cheese, mushrooms, tomatoes, white/grilled chicken, garlic, and green onions.",
      },
      {
        name: "Hawaiian",
        description: "Red sauce, cheese, ham, and pineapple.",
      },
      {
        name: "Ham Bacon Supreme",
        description:
          "Garlic white sauce, cheese, ham, bacon, mushrooms, black olives, and green onions.",
      },
      {
        name: "Meat Fiesta",
        description:
          "Red sauce, cheese, ham, salami, pepperoni, beef, sausage, and bacon.",
      },
      {
        name: "Mexicano",
        description:
          "Red sauce, cheese, red onions, tomatoes, jalapeños, beef, sausage, and cilantro.",
      },
      {
        name: "Pesto Chicken",
        description:
          "Pesto sauce, cheese, red onions, tomatoes, and grilled chicken.",
      },
    ],
  },
  {
    id: "cyo",
    title: "Craft Your Own / Cheese & Pepperoni",
    intro:
      "Start with red sauce, cheese, and one free topping. Extra toppings are charged. Any sauce can be substituted.",
    items: [
      {
        name: "Craft Your Own",
        description:
          "Red sauce, cheese, and one free topping. Toppings include vegetables, marinated cauliflower or paneer, Jain paneer, chicken styles, and meats. Sausage is a premium topping.",
      },
      {
        name: "Cheese Pizza",
        description: "Red sauce and extra cheese.",
        note: "Listed as an offer on the website.",
      },
      {
        name: "Pepperoni Pizza",
        description: "Red sauce, cheese, and extra pepperoni.",
        note: "Listed as an offer on the website.",
      },
      {
        name: "Hot Honey Pepperoni Pizza",
        description: "Red sauce, cheese, pepperoni, and a hot honey drizzle.",
      },
    ],
  },
  {
    id: "indian-veg",
    title: "Indian pizzas — vegetarian",
    intro:
      "A bold fusion of authentic Indian spices and premium pizza ingredients, handcrafted on fresh dough.",
    items: [
      {
        name: "Achari Cauliflower",
        description:
          "Garlic white sauce (contains egg), cheese, red onions, tomatoes, marinated cauliflower, green onions, and cilantro.",
      },
      {
        name: "Achari Paneer",
        description:
          "Garlic white sauce, cheese, red onions, tomatoes, achari paneer, cilantro, and green onions.",
      },
      {
        name: "Butter Achari Cauliflower",
        description:
          "Butter sauce, cheese, red onions, tomatoes, marinated cauliflower, cilantro, and green onions.",
      },
      {
        name: "Butter Paneer",
        description:
          "Shahi butter sauce, cheese, red onions, tomatoes, marinated paneer, cilantro, and green onions.",
      },
      {
        name: "Chilly Paneer",
        description:
          "Chilly sauce, mozzarella, green bell peppers, red onions, paneer, and green onions.",
      },
      {
        name: "Curry Paneer",
        description:
          "Curry sauce, cheese, green bell peppers, red onions, tomatoes, marinated paneer, cilantro, and green onions.",
      },
      {
        name: "Chutney Pizza",
        description:
          "Red sauce, tomatoes, red onions, mozzarella, and cilantro chutney.",
      },
      {
        name: "Indian Veggie",
        description:
          "Curry sauce, cheese, mushrooms, green bell peppers, red onions, tomatoes, black olives, jalapeños, and cilantro.",
      },
      {
        name: "Desi BBQ Paneer",
        description:
          "BBQ sauce, cheese, marinated paneer, red onions, and jalapeños.",
      },
      {
        name: "Jain Paneer",
        description:
          "Vegan Jain red sauce, cheese, green bell peppers, tomatoes, Jain paneer, and cilantro. No onion or garlic.",
      },
      {
        name: "Jain Veggie",
        description:
          "Vegan Jain red sauce, cheese, green bell peppers, tomatoes, black olives, jalapeños, pineapple, and cilantro. No onion or garlic.",
      },
      {
        name: "Potato Chaat Masala",
        description:
          "Red sauce, marinated potatoes, red onions, mozzarella, and cilantro.",
      },
      {
        name: "Potato Cauliflower",
        description:
          "Curry sauce, marinated potatoes, marinated cauliflower, red onions, cheese, and cilantro.",
      },
      {
        name: "Malai Paneer",
        description:
          "Malai sauce (contains egg), cheese, green bell peppers, red onions, tomatoes, and marinated paneer.",
      },
      {
        name: "Spinach Paneer",
        description:
          "Pesto sauce, cheese, spinach, red onions, marinated paneer, and garlic.",
      },
      {
        name: "Veg Extravaganza",
        description:
          "Red sauce, cheese, mushrooms, green bell peppers, red onions, tomatoes, black olives, and garlic.",
      },
    ],
  },
  {
    id: "indian-chicken",
    title: "Indian pizzas — chicken & meat",
    items: [
      {
        name: "Achari Chicken",
        description:
          "Garlic white sauce, cheese, red onions, tomatoes, achari chicken, and cilantro.",
      },
      {
        name: "Butter Chicken",
        description:
          "Shahi butter sauce, cheese, green bell peppers, red onions, tomatoes, butter chicken, and cilantro.",
      },
      {
        name: "Chicken Tikka",
        description:
          "Garlic white sauce, cheese, red onions, tomatoes, chicken tikka, cilantro, and green onions.",
      },
      {
        name: "Chilly Chicken",
        description:
          "Chilly sauce, mozzarella, green bell peppers, red onions, chicken, and green onions.",
      },
      {
        name: "Curry Chicken",
        description:
          "Curry sauce, cheese, green bell peppers, red onions, tomatoes, curry chicken, green onions, and cilantro.",
      },
      {
        name: "Tandoori BBQ Chicken",
        description:
          "BBQ sauce, cheese, red onions, jalapeños, and tandoori-marinated chicken.",
      },
      {
        name: "Malai Chicken",
        description:
          "Malai sauce, cheese, red onions, tomatoes, and marinated chicken.",
      },
      {
        name: "Tandoori Chicken",
        description:
          "Garlic white sauce, cheese, green bell peppers, red onions, tomatoes, tandoori chicken, green onions, and cilantro.",
      },
      {
        name: "Lamb Curry (Halal)",
        description:
          "Curry sauce, cheese, green chili, red onions, marinated lamb, garlic, and cilantro.",
      },
    ],
  },
  {
    id: "half",
    title: "Half ’n’ Half",
    intro:
      "Any two specialty pizzas, half of each. Available on Large and Extra Large only. Craft Your Own uses its own price list. Vegan pizzas stay $25.99 on the 12\" gluten-free crust.",
    items: [
      {
        name: "Half ’n’ Half",
        description: "Pick any two specialty pizzas.",
      },
    ],
  },
  {
    id: "vegan",
    title: "Vegan menu",
    intro:
      "All vegan pizzas are on a 12\" gluten-free crust for $25.99.",
    items: [
      {
        name: "Classic Veggie Vegan",
        description:
          "Vegan red sauce, vegan cheese, mushrooms, green bell peppers, red onions, tomatoes, black olives, and artichokes.",
      },
      {
        name: "Indian Veggie Vegan",
        description:
          "Vegan curry sauce, vegan cheese, mushrooms, green bell peppers, red onions, tomatoes, black olives, jalapeños, and cilantro.",
      },
      {
        name: "Veg Extravaganza Vegan",
        description:
          "Vegan red sauce, vegan cheese, mushrooms, green bell peppers, red onions, tomatoes, black olives, and garlic.",
      },
      {
        name: "Potato Chaat Vegan",
        description:
          "Vegan red sauce, marinated potatoes, red onions, vegan cheese, and cilantro.",
      },
      {
        name: "Potato Cauliflower Vegan",
        description:
          "Vegan curry sauce, marinated potatoes, marinated cauliflower, red onions, vegan cheese, and cilantro.",
      },
      {
        name: "Craft Your Own Vegan",
        description:
          "Vegan red sauce, vegan cheese, and one free topping. Extra toppings are charged.",
      },
      {
        name: "Vegan Pepperoni Pizza",
        description: "Vegan red sauce, vegan cheese, and vegan pepperoni.",
      },
      {
        name: "Vegan Wings",
        description: "Six plant-based wings tossed in your choice of sauce.",
      },
    ],
  },
  {
    id: "halal",
    title: "Halal menu",
    intro:
      "The Halal menu uses Halal meats. These pizzas follow the same builds as their counterparts, made with Halal-certified meat. The Halal BBQ Chicken Combination listing does not include bacon.",
    items: [
      { name: "Halal Pepperoni Pizza" },
      { name: "Achari Chicken Halal Pizza" },
      { name: "BBQ Chicken Combination Halal" },
      { name: "Buffalo Chicken Halal" },
      { name: "Butter Chicken Halal Pizza" },
      { name: "Curry Chicken Halal Pizza" },
      { name: "Chicken Tikka Halal Pizza" },
      { name: "Pesto Chicken Halal" },
      { name: "Malai Chicken Halal Pizza" },
      { name: "Garlic Chicken Supreme Halal" },
      { name: "Tandoori Chicken Halal Pizza" },
      { name: "Tandoori BBQ Chicken Halal" },
      { name: "Lamb Curry (Halal)" },
      { name: "CYO Halal Pizza", description: "Red sauce, cheese, and one free Halal topping." },
      {
        name: "Halal Chicken Caesar Salad",
        description:
          "Romaine, croutons, Parmesan, Halal chicken, and Caesar dressing.",
      },
      { name: "Halal Garden Chicken Caesar Salad" },
      {
        name: "Halal Wings",
        description:
          "Tandoori, Achari, BBQ, Buffalo Hot, Honey Sriracha, and Mango Habanero — bone-in and boneless options.",
      },
      { name: "Chicken Tenders Halal" },
    ],
  },
  {
    id: "wings",
    title: "Wings",
    items: [
      {
        name: "24 Piece Wings Combo",
        description: "Four flavors, six wings each, with four dipping sauces.",
      },
      { name: "12 Piece Wings Combo" },
      {
        name: "Achari Wings",
        description: "Six bone-in wings with achari spices and dipping sauce.",
      },
      {
        name: "BBQ Wings",
        description: "Six bone-in wings with BBQ sauce and dipping sauce.",
      },
      {
        name: "Curry Wings",
        description: "Six bone-in wings with curry sauce and dipping sauce.",
      },
      {
        name: "Honey Sriracha Wings",
        description: "Six bone-in wings with honey Sriracha glaze and dipping sauce.",
      },
      {
        name: "Buffalo Hot Wings",
        description: "Six bone-in wings with buffalo hot sauce and dipping sauce.",
      },
      {
        name: "Lemon Pepper Wings",
        description: "Six bone-in wings with lemon pepper seasoning and dipping sauce.",
      },
      {
        name: "Mango Habanero Wings",
        description: "Six bone-in wings with mango habanero glaze and dipping sauce.",
      },
      {
        name: "Tandoori Wings",
        description: "Six bone-in wings with tandoori marinade and dipping sauce.",
      },
      { name: "Plain Wings", description: "Bone-in chicken wings, unsauced." },
      {
        name: "Boneless BBQ Wings",
        description: "Six boneless bites with BBQ sauce and dipping sauce.",
      },
      {
        name: "Boneless Honey Sriracha Wings",
        description: "Six boneless tenders with honey Sriracha glaze and dipping sauce.",
      },
      {
        name: "Boneless Buffalo Hot Wings",
        description: "Six boneless tenders with buffalo hot sauce and dipping sauce.",
      },
      {
        name: "Boneless Mango Habanero Wings",
        description: "Six boneless tenders with mango habanero glaze and dipping sauce.",
      },
      {
        name: "Boneless Tandoori Wings",
        description: "Six boneless tenders with tandoori marinade and dipping sauce.",
      },
      {
        name: "Plain Boneless Wings",
        description: "Boneless chicken tenders, unsauced.",
      },
    ],
  },
  {
    id: "pasta",
    title: "Pasta",
    items: [
      {
        name: "Butter Sauce Pasta",
        description: "Penne in Shahi butter sauce and Indian spices.",
        price: "$15.99",
      },
      {
        name: "Butter Chicken Pasta",
        description: "Penne in Shahi butter sauce with chicken and Indian spices.",
        price: "$17.99",
      },
      {
        name: "Butter Paneer Pasta",
        description: "Penne in Shahi butter sauce with paneer and Indian spices.",
        price: "$17.99",
      },
      {
        name: "Fettuccini Alfredo",
        description: "Fettuccine in Alfredo sauce, finished with Parmesan.",
        price: "$15.99",
      },
      {
        name: "Fettuccini Chicken Alfredo",
        description: "Fettuccine in Alfredo sauce with grilled chicken and Parmesan.",
        price: "$17.99",
      },
      {
        name: "Penne Arrabbiata",
        description:
          "Penne in spicy tomato sauce with garlic, olive oil, red chili flakes, Parmesan, and herbs.",
        price: "$15.99",
      },
      {
        name: "Penne Chicken Arrabbiata",
        description: "Penne Arrabbiata with grilled chicken.",
        price: "$17.99",
      },
      {
        name: "Penne Pesto",
        description: "Penne in pesto sauce with garlic, olive oil, Parmesan, and herbs.",
        price: "$15.99",
      },
      {
        name: "Penne Pesto Chicken",
        description: "Penne pesto with grilled chicken.",
        price: "$17.99",
      },
      {
        name: "Penne Pesto Paneer",
        description: "Penne pesto with marinated paneer.",
        price: "$17.99",
      },
      {
        name: "Pink Sauce Pasta",
        description: "Penne in pink sauce, topped with Parmesan and herbs.",
        price: "$15.99",
      },
      {
        name: "Pink Sauce Chicken Pasta",
        description: "Penne in pink sauce with garlic chicken, Parmesan, and herbs.",
        price: "$17.99",
      },
    ],
  },
  {
    id: "appetizers",
    title: "Appetizers",
    items: [
      {
        name: "Pesto Sticks",
        description:
          "Cheesy breadsticks with pesto, jalapeños, and red onions, plus two dipping sauces.",
        price: "$11.99",
      },
      {
        name: "Potato Samosa",
        description:
          "Pastry pockets with spiced mashed potatoes, green peas, and herbs, served with cilantro chutney.",
        price: "2 pc $5.99 · 5 pc $12.99 · 10 pc $21.99",
      },
      {
        name: "Garlic Bread with Cheese",
        description:
          "Breadsticks with garlic spread, oregano, and melted cheese, served with two sides of ranch.",
        price: "$8.99",
      },
      {
        name: "Garlic Bread with Jalapeños and Pineapple",
        description:
          "Cheesy garlic breadsticks with oregano, jalapeños, and pineapple.",
        price: "$11.99",
      },
      {
        name: "Jalapeno Corn Garlic Bites",
        description:
          "Baked bites with sweet corn, jalapeños, a creamy cheese blend, and red onions.",
      },
      {
        name: "Potato Tikki Burger",
        description:
          "Brioche bun with potato tikki, lettuce, red onions, tomatoes, and cheese.",
      },
      {
        name: "Potato Chips",
        description: "Masala-seasoned chips with two sides of ranch.",
        price: "$8.99",
      },
      {
        name: "Mozzarella Sticks",
        description: "Six breaded mozzarella sticks.",
        price: "$7.99",
      },
      {
        name: "Jalapeno Poppers",
        description: "Six breaded jalapeños with cream cheese filling.",
        price: "$7.99",
      },
      {
        name: "Onion Rings",
        description: "Battered onion rings.",
        price: "$6.99",
      },
      {
        name: "Potato Wedges",
        description: "Seasoned potato wedges.",
        price: "$5.99",
      },
      { name: "Fries", description: "French fries.", price: "$4.99" },
      {
        name: "Pani Puri / Gol Gappe",
        description: "Six crispy puris with marinated potato filling and spicy water.",
        price: "$8.99",
      },
      {
        name: "Cauliflower Wings",
        description:
          "Breaded cauliflower tossed in Hot, BBQ, Honey Sriracha, or Mango Habanero. Contains wheat and milk.",
        price: "$9.99",
      },
      {
        name: "Vegan Wings",
        description: "Six plant-based wings tossed in your choice of sauce.",
      },
      {
        name: "Cheese/Paneer Pakoda",
        description: "Four paneer fritters served with chutneys.",
        price: "$7.99",
      },
      { name: "Tater Tots", description: "Seasoned potato tots." },
    ],
  },
  {
    id: "salads",
    title: "Salads",
    items: [
      {
        name: "Caesar Salad",
        description: "Romaine, Parmesan, croutons, and Caesar dressing.",
        price: "$7.99",
      },
      {
        name: "Chicken Caesar Salad",
        description: "Caesar salad with grilled chicken.",
        price: "$9.99",
      },
      {
        name: "Garden Salad",
        description:
          "Romaine, red onions, tomatoes, black olives, Parmesan, croutons, and Caesar dressing.",
        price: "$7.99",
      },
      {
        name: "Antipasto Salad",
        description:
          "Ham, salami, pepperoni, lettuce, Parmesan, croutons, and dressing on the side.",
      },
      { name: "Party Caesar Salad Tray" },
      { name: "Party Garden Salad Tray" },
      { name: "Side Salad", price: "$3.49" },
    ],
  },
  {
    id: "kids",
    title: "Kids menu",
    intro:
      "For guests under 12. Dine-in orders are served with a fountain soda.",
    items: [
      {
        name: "Kids Cheese Pizza",
        description: "Red sauce and extra cheese.",
        price: "$9.99",
        note: "Listed as an offer on the website.",
      },
      {
        name: "Kids Pepperoni Pizza",
        description: "Red sauce, cheese, and pepperoni.",
        price: "$9.99",
        note: "Listed as an offer on the website.",
      },
    ],
  },
  {
    id: "dessert",
    title: "Dessert",
    items: [
      {
        name: "Chocolate Chip Cookie (8\")",
        price: "$8.99",
        note: "Marked out of stock on the website.",
      },
      { name: "Brownie (8\")", price: "$8.99" },
      { name: "Vanilla Ice Cream", price: "$2.50" },
      { name: "Chocolate Ice Cream", price: "$2.50" },
      { name: "Strawberry Ice Cream", price: "$2.50" },
      { name: "Gajar Halwa" },
    ],
  },
  {
    id: "drinks",
    title: "Beverages",
    items: [
      { name: "Mango Lassi" },
      {
        name: "Masala Cola",
        description: "Cola with fresh lime and Indian spices.",
      },
      {
        name: "Masala Soda",
        description: "Sparkling soda with fresh lime and Indian spices.",
      },
      {
        name: "Masala Sprite",
        description: "Sprite with fresh lime and Indian spices.",
      },
      { name: "Water", description: "Bottled water." },
      { name: "Can Soda", price: "$1.50" },
      { name: "Limca (300ml)", price: "$3.49" },
      { name: "Thums Up (300ml)", price: "$3.49" },
      { name: "Jal Jeera (275ml)", price: "$3.49" },
    ],
  },
  {
    id: "dips",
    title: "Dips & condiments",
    items: [
      { name: "Ranch" },
      { name: "Jalapeno Ranch" },
      { name: "BBQ Sauce" },
      { name: "Marinara Sauce" },
      { name: "Hot Sauce" },
      { name: "Red Pepper Packets", price: "$0.10" },
      { name: "Parmesan Cheese Packets", price: "$0.10" },
    ],
  },
];
