const cartSchema = new mongoose.Schema({
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item',  // Reference to Item model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ]
  });
  
  // Add a virtual field or a method to calculate the total price
  cartSchema.methods.calculateTotalPrice = async function() {
    await this.populate('items.item'); // Populate item details including price
    let total = 0;
  
    this.items.forEach(cartItem => {
      total += cartItem.item.price * cartItem.quantity;
    });
  
    return total;
  };
  
  const Cart = mongoose.model('Cart', cartSchema);
  
  module.exports = { Cart, Item };
  