// mockStores.ts

import { Store } from "../app/interfaces";

export const stores: Store[] = [
  {
    storeTitle: "Phillip Market",
    storeDistance: "2.5km",
    storeCategory: "Grocery Store",
    storeItemQuantity: 16,
    storeLogo: {
      uri: "https://down-sg.img.susercontent.com/file/sg-11134202-7rd3l-lvjv6pvqrpt55d",
    },
    storeLatitude: 37.78825,
    storeLongitude: -122.4324,
    storeAddress: "1234, 5th Avenue, New York",
    storePostalCode: "10001",
    storeRating: 4.5,
    storeEmailAddress: "test@gmail.com",
    items: [
      {
        name: "Barbeque Smoked Beef Steak",
        finalPrice: 1.99,
        originalPrice: 4.5,
        discount: 0.35,
        quantity: 2,
        imageURL: {
          uri: "https://down-sg.img.susercontent.com/file/sg-11134202-7rd3l-lvjv6pvqrpt55d",
        },
        expiryDate: new Date(),
        description:
          "Let it makes an bread sandwich. Its flavours from the pulp of Banana, Papaya, Apple, Pear, Pineapple, Mango, Grape And Orange.",
      },
      {
        name: "Baked Cheese and Veggie",
        finalPrice: 4.99,
        originalPrice: 5.8,
        discount: 0.35,
        quantity: 1,
        imageURL: require("@/assets/store/cheese.png"),
        expiryDate: new Date(),
        description:
          "Let it makes an bread sandwich. Its flavours from the pulp of Banana, Papaya, Apple, Pear, Pineapple, Mango, Grape And Orange.",
      },
      {
        name: "Barbeque Smoked Beef Steak",
        finalPrice: 1.99,
        originalPrice: 4.5,
        discount: 0.35,
        quantity: 2,
        imageURL: require("@/assets/store/beef.png"),
        expiryDate: new Date(),
        description:
          "Let it makes an bread sandwich. Its flavours from the pulp of Banana, Papaya, Apple, Pear, Pineapple, Mango, Grape And Orange.",
      },
      {
        name: "Baked Cheese and Veggie",
        finalPrice: 4.99,
        originalPrice: 5.8,
        discount: 0.35,
        quantity: 1,
        imageURL: require("@/assets/store/cheese.png"),
        expiryDate: new Date(),
        description:
          "Let it makes an bread sandwich. Its flavours from the pulp of Banana, Papaya, Apple, Pear, Pineapple, Mango, Grape And Orange.",
      },
    ],
  },
  {
    storeTitle: "Starbucks Coffee",
    storeDistance: "2.5km",
    storeCategory: "Grocery Store",
    storeItemQuantity: 16,
    storeLogo: require("@/assets/icons/locationIcon.png"),
    storeLatitude: 37.78825,
    storeLongitude: -122.4324,
    storeAddress: "1234, 5th Avenue, New York",
    storePostalCode: "10001",
    storeRating: 4.5,
    storeEmailAddress: "test@gmail.com",
    items: [
      {
        name: "Barbeque Smoked Beef Steak",
        finalPrice: 1.99,
        originalPrice: 4.5,
        discount: 0.35,
        quantity: 2,
        imageURL: require("@/assets/store/beef.png"),
        expiryDate: new Date(),
        description:
          "Let it makes an bread sandwich. Its flavours from the pulp of Banana, Papaya, Apple, Pear, Pineapple, Mango, Grape And Orange.",
      },
      {
        name: "Baked Cheese and Veggie",
        finalPrice: 4.99,
        originalPrice: 5.8,
        discount: 0.35,
        quantity: 1,
        imageURL: require("@/assets/store/cheese.png"),
        expiryDate: new Date(),
        description:
          "Let it makes an bread sandwich. Its flavours from the pulp of Banana, Papaya, Apple, Pear, Pineapple, Mango, Grape And Orange.",
      },
      {
        name: "Barbeque Smoked Beef Steak",
        finalPrice: 1.99,
        originalPrice: 4.5,
        discount: 0.35,
        quantity: 2,
        imageURL: require("@/assets/store/beef.png"),
        expiryDate: new Date(),
        description:
          "Let it makes an bread sandwich. Its flavours from the pulp of Banana, Papaya, Apple, Pear, Pineapple, Mango, Grape And Orange.",
      },
      {
        name: "Baked Cheese and Veggie",
        finalPrice: 4.99,
        originalPrice: 5.8,
        discount: 0.35,
        quantity: 1,
        imageURL: require("@/assets/store/cheese.png"),
        expiryDate: new Date(),
        description:
          "Let it makes an bread sandwich. Its flavours from the pulp of Banana, Papaya, Apple, Pear, Pineapple, Mango, Grape And Orange.",
      },
    ],
  },
  {
    storeTitle: "Starbucks Coffee",
    storeDistance: "2.5km",
    storeCategory: "Grocery Store",
    storeItemQuantity: 16,
    storeLogo: require("@/assets/icons/starbucks.png"),
    storeLatitude: 37.78825,
    storeLongitude: -122.4324,
    storeAddress: "1234, 5th Avenue, New York",
    storePostalCode: "10001",
    storeRating: 4.5,
    storeEmailAddress: "test@gmail.com",
    items: [
      {
        name: "Barbeque Smoked Beef Steak",
        finalPrice: 1.99,
        originalPrice: 4.5,
        discount: 0.35,
        quantity: 2,
        imageURL: require("@/assets/store/beef.png"),
        expiryDate: new Date(),
        description:
          "Let it makes an bread sandwich. Its flavours from the pulp of Banana, Papaya, Apple, Pear, Pineapple, Mango, Grape And Orange.",
      },
      {
        name: "Baked Cheese and Veggie",
        finalPrice: 4.99,
        originalPrice: 5.8,
        discount: 0.35,
        quantity: 1,
        imageURL: require("@/assets/store/cheese.png"),
        expiryDate: new Date(),
        description:
          "Let it makes an bread sandwich. Its flavours from the pulp of Banana, Papaya, Apple, Pear, Pineapple, Mango, Grape And Orange.",
      },
      {
        name: "Barbeque Smoked Beef Steak",
        finalPrice: 1.99,
        originalPrice: 4.5,
        discount: 0.35,
        quantity: 2,
        imageURL: require("@/assets/store/beef.png"),
        expiryDate: new Date(),
        description:
          "Let it makes an bread sandwich. Its flavours from the pulp of Banana, Papaya, Apple, Pear, Pineapple, Mango, Grape And Orange.",
      },
      {
        name: "Baked Cheese and Veggie",
        finalPrice: 4.99,
        originalPrice: 5.8,
        discount: 0.35,
        quantity: 1,
        imageURL: require("@/assets/store/cheese.png"),
        expiryDate: new Date(),
        description:
          "Let it makes an bread sandwich. Its flavours from the pulp of Banana, Papaya, Apple, Pear, Pineapple, Mango, Grape And Orange.",
      },
    ],
  },
];
