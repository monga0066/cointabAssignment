import { Box, Button, Heading, Img, Select } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const getData = async (filter = "", page = 1) => {
    try {
      const data = await axios.get(
        `https://com-p407.onrender.com/users?filter=${filter}&page=${page}`
      );
      console.log(data.data.results);
      setUsers(data.data.results);
      setTotalPage(data.data.totalPages);
    } catch (err) {}
  };

  function buttons() {
    let arr = new Array(totalPage).fill(1);
    let buttons = arr.map((item, i) => (
      <Button
        margin={"5px"}
        colorScheme={"facebook"}
        disabled={page == i + 1}
        key={i}
        onClick={(e) => setPage(i + 1)}
      >
        {i + 1}
      </Button>
    ));
    return buttons;
  }

  useEffect(() => {
    getData(gender, page);
  }, [gender, page]);
  return (
    <div>
      <Box
        borderBottom={"1px solid gray"}
        padding="50px"
        height="100px"
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        position="sticky"
        top={"0"}
        bg="white"
      >
        <Link to={"/"}>
          <Button colorScheme={"blackAlpha"}>Go to home</Button>
        </Link>
        <Select
          width={"200px"}
          border="1px solid black"
          onChange={(e) => {setGender(e.target.value)
          setPage(1)
          }}
        >
          <option value="">Filter by Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
      </Box>

      <div>
        {users.length==0 && <Heading>Add some Data</Heading>}
        {users.length > 0 &&
          users.map((item, i) => {
            return (
              <Box
                key={i}
                display="flex"
                padding={"20px"}
                width="80%"
                margin={"auto"}
                marginBottom="20px"
                border="1px solid black"
                borderRadius={"10px"}
              >
                <Img src={item.picture.large} alt={item.picture.large} />
                <Box padding={"10px"} textAlign="left">
                  <Heading fontSize={"19px"}>
                    {item.name.title} {item.name.first} ({item.gender})
                  </Heading>
                  <p fontSize={"16px"}>{item.email} </p>
                  <p fontSize={"16px"}>{item.phone} </p>
                  <p fontSize={"16px"}>City - {item.location.city} </p>
                  <p fontSize={"16px"}>Country - {item.location.country} </p>
                </Box>
              </Box>
            );
          })}
      </div>

      <div>
        <Button
          colorScheme={"whatsapp"}
          disabled={page == 1}
          onClick={() => setPage(page - 1)}
        >
          Pre
        </Button>
        {users.length>0 && buttons()}
        <Button
          colorScheme={"whatsapp"}
          disabled={page == totalPage}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Users;
