const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/* module.exports.subscriptionPayment = async (req, res) => {
  const { name, email, paymentMethod, planId, planName } = req.body;

  try {
    let customer;

    // Check if a customer with the email already exists
    const existingCustomer = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomer.data.length > 0) {
      // Use the existing customer if found
      customer = existingCustomer.data[0];

      // Update customer's payment method
      await stripe.paymentMethods.attach(paymentMethod, {
        customer: customer.id,
      });
    } else {
      // Create a new customer
      customer = await stripe.customers.create({
        name,
        email,
        payment_method: paymentMethod,
        invoice_settings: {
          default_payment_method: paymentMethod,
        },
      });
    }

    // Create a subscription for the customer
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: planId }],
      expand: ["latest_invoice.payment_intent"],
    });

    // Get the client secret from the payment intent
    const { client_secret } = subscription.latest_invoice.payment_intent;

    // Retrieve billing details and plan details
    const billingInfo = {
      name: customer.name,
      email: customer.email,
      address: customer.address,
      // Include any other relevant billing details you want to return
    };

    const planDetails = {
      planName: planName,
      // Include other plan details like price, duration, etc.
    };

    res
      .status(200)
      .json({ clientSecret: client_secret, billingInfo, planDetails });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ error: "Failed to create subscription" });
  }
}; */

module.exports.getAllUser = async (req, res) => {
  try {
    const subscriptions = await stripe.subscriptions.list();
    const subscribers = [];

    for (const subscription of subscriptions.data) {
      const customer = await stripe.customers.retrieve(subscription.customer);
      subscribers.push({
        userId: customer.id,
        email: customer.email,
        subscriptionId: subscription.id,
        planId: subscription.items.data[0].price.id,
        status: subscription.status,
      });
    }

    res.status(200).json(subscribers);
  } catch (error) {
    console.error("Error retrieving subscribers:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
