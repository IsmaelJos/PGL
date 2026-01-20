import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Button, Text, TextInput, View, Alert, Modal } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login, token } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [newAmount, setNewAmount] = useState(0);
  const [newDescription, setNewDescription] = useState("");
  const [currentExpenseId, setcurrentExpenseId] = useState("");
  const [expenses, setExpenses] = useState([
    {
      id: "e.id",
      desc: "e.description",
      amount: "e.amount",
      paid_by: "e.paid_by",
    },
    {
      id: "e.id2",
      desc: "e.description",
      amount: "e.amount",
      paid_by: "e.paid_by",
    },
    {
      id: "e.id3",
      desc: "e.description",
      amount: "e.amount",
      paid_by: "e.paid_by",
    },
  ]);
  const router = useRouter();

  const handleDelete = (id: string) => {
    console.log("Borro el id "+ id);
    Alert.alert("Voy a borrar el id "+ id);
    for (let i = 0; i < expenses.length; i++) {
      console.log(expenses[i]);
      if(expenses[i].id == id){
        expenses.splice(i,1);
        setExpenses([...expenses]);
      }
    }
  };

  const handleEdit = (id:string) => {
    setModalVisible(false);
    Alert.alert(`voy a editar el gasto ${currentExpenseId} con cantidad ${newAmount} y descripcion ${newDescription}`)
  };

  const openModal = (id : string) => {
    setcurrentExpenseId(id);
    setModalVisible(true);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text>Mi grupo</Text>
      {expenses.map((e) => (
        <View key={e.id}>
          <Text>{`${e.amount} - ${e.desc}`}</Text>
          <Button title="Modificar" onPress={() => openModal(e.id)} />
          <Button title="Borrar" onPress={() => handleDelete(e.id)} />
        </View>
      ))}

      <Modal visible={modalVisible}>
        <Text>Editando expense #{currentExpenseId}</Text>
        <TextInput value={newAmount} onChange={(text)=>setNewAmount(text)}></TextInput>
        <TextInput value={newDescription} onChange={(text)=>setNewDescription(text)}></TextInput>
        <Button title=""></Button>
      </Modal>

      <Button title="Volver a mis grupos" onPress={() => router.replace("/")} />
    </View>
  );
}
