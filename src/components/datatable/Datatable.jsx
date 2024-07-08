import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const Datatable = ({columns}) => {
  const location = useLocation();
  const type = location.pathname.split('/')[1];

  const [data, setData] = useState([]);

  useEffect(() => { 
    const unsub = onSnapshot(
      collection(db, type),
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setData(list);
        },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, [type]); 

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, type, id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={"/" + type + "/" + params.row.id} style={{ textDecoration: "none" }}>
            <span className="viewButton">View</span>
          </Link>
          <span>
	          <span
	            className="deleteButton"
	            onClick={() => handleDelete(params.row.id)}
	          >
	            Delete
	          </span>
	        </span>
        </div>
      );
    },
  },
];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {type.toUpperCase()}
        <Link to= {"/" + type + "/new"} className="link">
          Add New
        </Link>
      </div>
      <DataGrid className="datagrid" 
        rows={data}
        columns={columns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
