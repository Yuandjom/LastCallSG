import { Modal } from "react-native";
import { useState } from "react";
import ItemQuantity from "./ItemQuantity";
import ItemReservation from "./ItemReservation";

interface MyModalProps {
  visible: boolean;
  onClose: () => void;
  item: any;
  store: any;
}

const ItemModal: React.FC<MyModalProps> = ({
  visible,
  onClose,
  item,
  store,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [currentComponent, setComponent] = useState("A");
  const [userEmail, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    var new_quantity = quantity - 1;
    if (new_quantity >= 0) {
      setQuantity(new_quantity);
    }
  };

  const shiftScreen = () => {
    setComponent("B");
  };

  const backToItemQuantity = () => {
    setComponent("A");
  };
  const renderComponent = () => {
    switch (currentComponent) {
      case "A":
        return (
          <ItemQuantity
            quantity={quantity}
            onClose={onClose}
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
            shiftScreen={shiftScreen}
            item={item}
            store={store}
          ></ItemQuantity>
        );
      case "B":
        return (
          <ItemReservation
            quantity={quantity}
            setEmail={setEmail}
            setContact={setContact}
            setName={setName}
            onClose={onClose}
            backToItemQuantity={backToItemQuantity}
            item={item}
            store={store}
          ></ItemReservation>
        );
    }
  };

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      {renderComponent()}
    </Modal>
  );
};

export default ItemModal;
