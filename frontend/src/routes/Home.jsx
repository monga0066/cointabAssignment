import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";

function Home() {
  const [isDataAdding, setIsDataAdding] = useState(false);
  const [isDataDeleting, setIsDataDeleting] = useState(false);
  const toast = useToast();

  async function addData() {
    if (isDataAdding) {
      alert("Already in Progress");
    } else {
      setIsDataAdding(true);
      try {
        const data = await axios.get("https://com-p407.onrender.com/users/add");
        console.log(data.data);
        setIsDataAdding(false);
        toast({
          title: "Data saved successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (err) {
        console.log(err);
        setIsDataAdding(false);
      }
    }
  }

  async function deleteData() {
    if (isDataDeleting) {
      alert("Already in Progress");
    } else {
      setIsDataDeleting(true);
      try {
        const res = await axios.delete("https://com-p407.onrender.com/users/delete");
        console.log(res);
        setIsDataDeleting(false);
        toast({
          title: "Data deleted successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (err) {
        console.log(err);
        setIsDataDeleting(false);
      }
    }
  }

  return (
    <>
    <Heading>Home Page</Heading>
    <Box height={"500px"}  display={"flex"} alignItems="center" justifyContent={"center"} gap="20px">
      <Button colorScheme={"whatsapp"} onClick={() => addData()}>
        {isDataAdding ? <Spinner color="white.500" /> : "Fetch Users"}
      </Button>
      <Button colorScheme={"red"} onClick={deleteData}>
        {isDataDeleting ? <Spinner color="white.500" /> : "Delete Users"}
      </Button>
      <Link to={"/users"}>
        <Button colorScheme={"facebook"}>User Details</Button>
      </Link>
    </Box>
    </>

  );
}

export default Home;
