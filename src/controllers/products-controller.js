const { removeEmptyProps } = require('../helpers');

const database = {
  products: [
    {
      id: "f_moist_1",
      title: "24-Hour Replenishing",
      description: "A richly hydrating 1 cream to leave skin feeling replenished and soft. Myrrh, Frankincense and Neroli replenish, while Vitamin E helps protect the skin barrier. Nourishing Evening Primrose and Jojoba also work to deeply moisturise leaving skin silky smooth.",
      categoryId: 1,
      price: 36,
      img: "https://static.thcdn.com/images/large/webp//productimg/1600/1600/12226493-2104858624896150.jpg"
    },
    {
      id: "f_moist_2",
      title: "Tri-Active™ Lift & Firm Moisturiser",
      description: "An intensely nourishing hydrator, our Tri-Active Lift &Firm Moisturiser boasts nutrient-rich Marine and Plant Actives for soft, supple, and plumped looking skin. This comforting formula hydrates and nourishes dull, sallow complexions. A rich whipped cream that brings you smooth petal-soft skin boosted with brightness.",
      categoryId: 1,
      price: 42,
      img: "https://static.thcdn.com/images/large/webp//productimg/1600/1600/12226503-1944858828507032.jpg"
    },
    {
      id: "f_moist_3",
      title: "24-Hour Balancing Moisturiser",
      description: "A gentle oil-balancing moisturiser to help hydrate and clarify the skin. White Thyme helps balance and calming Lavender and Chamomile soothe, while nutrient rich plant extracts and Irish Moss moisturise and protect without clogging pores.",
      categoryId: 1,
      price: 36,
      img: "https://static.thcdn.com/images/large/webp//productimg/1600/1600/12226495-1204768401944547.jpg"
    },
    {
      id: "f_serum_4",
      title: "Repair & Restore Intensive",
      description: "A potent serum that helps soothe and restore moisture. Wheatgerm helps protect the skin against environmental aggressors. Inca Inchi Oil restores moisture balance while Canola and Wild Indigo protect and soothe, helping boost skin's natural moisture barrier.",
      categoryId: 2,
      price: 37,
      img: "https://static.thcdn.com/images/large/webp//productimg/1600/1600/12226536-1294768405896744.jpg"
    },
    {
      id: "f_serum_5",
      title: "Tri-Active™ Lift & Firm Intensive Serum",
      description: "ESPA's Tri-Active™ Lift and Firm Intensive Serum tightens and brightens the skin, super-charged with exclusive Wild Olive. This age-defying concentrate helps visibly restore skin's firmness, elasticity, and bounce - bringing you youthful skin with a radiant lit-from-within glow. Our super serum leaves skin feeling plump and supple.",
      categoryId: 2,
      price: 45,
      img: "https://static.thcdn.com/images/large/webp//productimg/1600/1600/12226501-5134858828395924.jpg"
    },
    {
      id: "f_serum_6",
      title: "Optimal Skin Pro-Serum",
      description: "This nutrient-rich, glow-giving serum hydrates and nourishes the skin with supercharged natural actives. Used daily, this intensely revitalising serum helps to nurture and protect skin's natural moisture barrier so that even sensitive skin feels nurtured and emits a healthy-looking radiance. ",
      categoryId: 2,
      price: 37,
      img: "https://static.thcdn.com/images/large/webp//productimg/1600/1600/12595874-1204840384746024.jpg"
    },
    {
      id: "f_mask_7",
      title: "Clean & Green Detox Mask",
      description: "Restore your radiance and give tired, dull complexions a dose of goodness with this veggie-inspired detox mask. A green smoothie for the skin, this creamy clay formula is packed with plant-based, nutrient-dense greens to help reset skin. Feeling fresh without feeling dry, the greens in this mask are ready to help you glow.",
      categoryId: 3,
      price: 30,
      img: "https://static.thcdn.com/images/large/webp//productimg/1600/1600/12595883-9264840384960656.jpg"
    }
  ]
};

let counter = 1;
const createId = () => String(++counter);

const isValidProduct = ({ title, description, categoryId, price, img }) =>
  title !== undefined && typeof title === 'string' && title !== '' &&
  description !== undefined && typeof description === 'string' && description !== '' &&
  categoryId !== undefined && typeof categoryId === 'string' && categoryId !== '' &&
  price !== undefined && typeof price === 'number' && price > 0 &&
  img !== undefined && typeof img === 'string' && img !== '';

const createCmpById = (productId) => ({ id }) => id === productId;

const createProductNotFoundError = (productId) => ({
  message: `Product with id '${productId}' was not found`,
  status: 404
})

const createProductBadDataError = (dataObj) => ({
  message: `Product data is invalid:\n${JSON.stringify(dataObj, null, 4)}`,
  status: 400
});

const fetchAll = (req, res) => {
  res.status(200).json(database.products);
};

const fetch = (req, res) => {
  const productId = req.params.id;

  try {
    const foundProduct = database.products.find(createCmpById(productId));
    if (foundProduct === undefined) throw createProductNotFoundError(productId);

    res.status(200).json(foundProduct);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const create = (req, res) => {
  const newProductData = req.body;

  try {
    if (!isValidProduct(newProductData)) throw createProductBadDataError(newProductData);

    const newProduct = {
      id: createId(),
      ...newProductData,
    };

    database.products.push(newProduct)

    res.status(201).json(newProduct)

  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const replace = (req, res) => {
  const productId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newProductData = { title, description, categoryId, img, price };

  try {
    if (!isValidProduct(newProductData)) throw createProductBadDataError(newProductData);

    const foundProductIndex = database.products.findIndex(createCmpById(productId));
    if (foundProductIndex === -1) throw createProductNotFoundError(productId);

    const updatedProduct = {
      id: database.products[foundProductIndex].id,
      ...newProductData
    }

    database.products[foundProductIndex] = updatedProduct;

    res.status(200).json(updatedProduct)

  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const update = (req, res) => {
  const productId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newProductData = removeEmptyProps({ title, description, categoryId, img, price });

  try {

    const foundProductIndex = database.products.findIndex(createCmpById(productId));
    if (foundProductIndex === -1) throw createProductNotFoundError(productId);

    const updatedProduct = {
      ...database.products[foundProductIndex],
      ...newProductData,
    }

    database.products[foundProductIndex] = updatedProduct;

    res.status(200).json(updatedProduct)

  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const remove = (req, res) => {
  const productId = req.params.id;

  try {
    const foundProductIndex = database.products.findIndex(createCmpById(productId));
    if (foundProductIndex === -1) throw createProductNotFoundError(productId);

    const [deletedProduct] = database.products.splice(foundProductIndex, 1);

    res.status(200).json(deletedProduct);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};