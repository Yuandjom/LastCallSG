import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { truncateText } from "@/utils/truncateText";
import { useEffect, useState } from "react";

interface MyModalProps {
  quantity: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
  onClose: () => void;
  shiftScreen: () => void;
  item: any;
  store: any;
}

const ItemQuantity: React.FC<MyModalProps> = ({
  quantity,
  decreaseQuantity,
  increaseQuantity,
  onClose,
  shiftScreen,
  item,
  store,
}) => {
  const formattedExpiryDate = item.expiryDate
    .toString()
    .split("T")[0]
    .slice(0, 10);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  useEffect(() => {
    const price = quantity * item.originalPrice;
    const discount = quantity * item.originalPrice * item.discount;
    setTotalPrice(Number(price.toFixed(2)));
    setTotalDiscount(Number(discount.toFixed(2)));
  }, [quantity, item.originalPrice, item.discount]);

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalBackground}>
        <TouchableWithoutFeedback>
          <View style={styles.modalOverlay}>
            <View style={styles.detailAndQtyContainer}>
              <View style={styles.headerContainer}>
                <View>
                  <Text style={styles.itemName}>
                    {truncateText(item.name, 20)}
                  </Text>
                  <Text style={styles.itemTime}>
                    Best before {formattedExpiryDate}
                  </Text>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Ionicons name="close-outline" size={32} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.seperator}></View>
              <Text style={styles.selectQuantity}>{"Select quantity"}</Text>
              <View style={styles.quantitySelector}>
                <TouchableOpacity
                  style={[
                    styles.minusButton,
                    quantity == 0
                      ? styles.minusButtonInactivatedColor
                      : styles.minusButtonActivatedColor,
                  ]}
                  onPress={decreaseQuantity}
                  disabled={quantity == 0}
                >
                  <Ionicons name="remove-outline" size={32} color="white" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity
                  onPress={increaseQuantity}
                  disabled={quantity === item.quantity}
                  style={[
                    styles.addButton,
                    quantity == item.quantity
                      ? styles.plusButtonInactivatedColor
                      : styles.plusButtonActivatedColor,
                  ]}
                >
                  <Ionicons name="add-outline" size={32} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.seperator}></View>
              <View style={styles.priceContainer}>
                <Text>Price</Text>
                <Text>S${totalPrice}</Text>
              </View>
              <View style={styles.discountContainer}>
                <Text>Discount</Text>
                <Text>
                  - S$
                  {((item.originalPrice - item.finalPrice) * quantity).toFixed(
                    2
                  )}
                </Text>
              </View>
              <View style={styles.seperator}></View>
              <View style={styles.confirmationContainer}>
                <View style={styles.totalPriceContainer}>
                  <Text>Total</Text>
                  <Text style={styles.finalPrice}>
                    S${(item.finalPrice * quantity).toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.confirmationButton,
                    quantity === 0 ? styles.confirmationButtonDisabled : {},
                  ]}
                  onPress={shiftScreen}
                  disabled={quantity === 0}
                >
                  <Text style={styles.confirmationText}>
                    {"Proceed to Confirm"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  minusButtonActivatedColor: {
    backgroundColor: "#168F55",
  },
  minusButtonInactivatedColor: {
    backgroundColor: "grey",
  },
  plusButtonActivatedColor: {
    backgroundColor: "#168F55",
  },
  plusButtonInactivatedColor: {
    backgroundColor: "grey",
  },
  confirmationButtonDisabled: {
    backgroundColor: "gray",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  name: {
    fontWeight: "bold",
  },
  detailAndQtyContainer: {
    marginTop: "5%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemTime: {
    marginBottom: 5,
  },
  seperator: {
    height: 1,
    backgroundColor: "#EEEEEE",
    width: "80%",
    marginVertical: 10,
  },
  selectQuantity: {
    fontWeight: "bold",
    margin: 4,
  },
  quantity: {
    fontSize: 40,
    fontWeight: "bold",
    margin: 10,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  addButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  minusButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    backgroundColor: "white",
    height: "50%",
    marginTop: "auto",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#F5F2F9",
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  discountContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    margin: 5,
  },
  priceContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    margin: 5,
  },
  confirmationContainer: {
    flexDirection: "row",
    width: "90%",
    height: "14%",
    justifyContent: "space-between",
  },
  confirmationButton: {
    backgroundColor: "#168F55",
    width: "60%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    padding: 14,
  },
  confirmationText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  totalPriceContainer: {
    justifyContent: "center",
  },
  finalPrice: {
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 20,
  },
});

export default ItemQuantity;
