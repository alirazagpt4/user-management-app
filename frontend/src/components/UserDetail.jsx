import {
  Typography,
  TextField,
  Button,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
} from "@mui/material";
import { } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

function UserDetail() {
  const [selectedUser, setSelectedUser] = useState(null); // 🆕 Store Selected User
  const [fetchData, setFetchData] = useState([]);
  const [detail, setDetail] = useState({
    phone: "",
    role: "",
    profilePic: "",
  });

  useEffect(() => {
    // Fetch user details from server
    // Set user details to state
    const fetchDetails = async () => {
      const response = await fetch("http://localhost:4000/api/details", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"), // ✅ Token is fine
        },
        credentials: "include",
      });
      const result = await response.json();
      console.log("fetch users from api ", result);

      if (!result.fetch || !Array.isArray(result.fetch)) {
        console.error("Error: API response does not have an array!", result);
        return;
      }

      let formattedData = result.fetch.map((User) => {
        return {
          id: User._id,
          Name: User.userId.name,
          Phone: User.phone,
          Role: User.role,
        };
      });

      console.log(formattedData);
      setFetchData(formattedData);
    };

    fetchDetails();
  }, [selectedUser , detail]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Name", headerName: "User Name", width: 130 },
    { field: "Phone", headerName: "User Phone", width: 130 },
    { field: "Role", headerName: "Role ", width: 70 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ mr: 1 }}
              onClick={() => handleEditClick(params.row)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const handleChange = (e) => {
    if (e.target.name === "profilePic") {
      setDetail({ ...detail, profilePic: e.target.files[0] }); // ✅ File object store karein, sirf name nahi
    } else {
      setDetail({ ...detail, [e.target.name]: e.target.value });
    }
  };

  // console.log(detail);

  const handleEditClick = (user) => {
    setSelectedUser(user); // ✅ Selected User Set Karo
    setDetail({
      phone: user.Phone,
      role: user.Role,
      profilePic: null, // ✅ Agar new file chahiye to manually choose karni padegi
    });
  };


  const handleDelete = async (id)=>{
           if(!window.confirm('Are you sure you want to delete this user?')) return;

          const response = await fetch(`http://localhost:4000/api/deletedetail/${id}`,{
            method: 'DELETE',
            headers:{
              'content-type':'application/json',
              'Authorization': 'Bearer '+ localStorage.getItem('token'),
            },
            body: JSON.stringify({id}),
          });

          const result = await response.json() ;
          console.log(result);
          if(response){
            toast.success('User deleted successfully!');
            setFetchData(fetchData.filter(user=>user.id!== id));
          }
          else{
            toast.error('Error in deleting user!');
          }
          


  }

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("phone", detail.phone);
    formData.append("role", detail.role);
    if (detail.profilePic) {
      formData.append("profilePic", detail.profilePic);
    }

    const url = selectedUser
      ? `http://localhost:4000/api/updatedetail/${selectedUser.id}`
      : "http://localhost:4000/api/createdetail";

    const method = selectedUser ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
        credentials: "include",
      });

      const result = await response.json();
      console.log("Server Response:", result);

      if (response.ok) {
        toast.success(selectedUser ? "User Updated!" : "User Created!");
        setDetail({ phone: "", role: "", profilePic: null }); // ✅ Reset form
        setSelectedUser(null); // ✅ Reset selected user
      } else {
        toast.error("Error saving data!");
      }
    } catch (err) {
      console.error("Upload Error:", err);
    }
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper sx={{ padding: 4, mt: 4 }} elevation={14}>
          <Typography variant="h2">User Details</Typography>
          <form encType="multipart/form-data">
            <TextField
              required
              id="outlined-required"
              label="Phone"
              name="phone"
              onChange={handleChange}
              sx={{ m: 1 }}
            />
            {detail.phone}
            <br />
            <FormControl sx={{ m: 1, minWidth: 120 }} variant="outlined">
              <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="role"
                value={detail.role}
                onChange={handleChange}
                label="Select Role" // ✅ Yeh zaroori hai outlined variant ke sahi display ke liye
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            {detail.role}
            <TextField
              required
              id="outlined-required"
              onChange={handleChange}
              name="profilePic"
              type="file"
              sx={{ m: 1 }}
            />
            {detail.profilePic && (
              <img
                src={URL.createObjectURL(detail.profilePic)}
                alt="Profile Preview"
                width="100"
                height="100"
              />
            )}
            <br />
            <Button
              variant="contained"
              color="primary"
              sx={{ m: 1 }}
              onClick={handleClick}
            >
              {selectedUser ? "Update User" : "Add User"}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ m: 1 }}
              onClick={() => {
                setDetail({ phone: "", role: "", profilePic: null }); // ✅ Reset form
                setSelectedUser(null); // ✅ Edit Mode Se Nikalna
              }}
            >
              Cancel
            </Button>
          </form>
        </Paper>

        <Paper sx={{ height: 400, width: "100%" }} elevation={14}>
          <DataGrid
            rows={fetchData}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
        <ToastContainer />
      </Container>
    </>
  );
}

export default UserDetail;
