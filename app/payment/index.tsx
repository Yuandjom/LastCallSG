// PaymentScreen.js
import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";

export default function PaymentScreen() {
  const { confirmPayment } = useStripe();
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("20");
  const [cardDetails, setCardDetails] = useState({});

  const handlePayment = async () => {
    if (!cardDetails) {
      console.log("Card details not complete");
      return;
    }

    try {
      const response = await fetch(
        "https://411r12agye.execute-api.ap-southeast-1.amazonaws.com/test",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: parseInt(amount) * 100 }), // amount in cents
        }
      );
      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails: {
            email: email,
          },
        },
      });

      if (error) {
        console.log("Payment failed", error);
      } else if (paymentIntent) {
        console.log("Payment successful", paymentIntent);
      }
    } catch (e) {
      console.log("Payment error", e);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{ marginBottom: 20 }}
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={{ marginBottom: 20 }}
      />
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
        }}
        style={{
          width: "100%",
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(details) => {
          setCardDetails(details);
        }}
      />
      <Button title="Pay" onPress={handlePayment} />
    </View>
  );
}
