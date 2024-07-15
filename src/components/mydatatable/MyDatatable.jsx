import "./mydatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const MyDatatable = ({columns}) => {
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

  const myActionColumn = [
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="myCellAction">
          <Link to={"/" + type + "/" + params.row.id} style={{ textDecoration: "none" }}>
            <span className="myViewButton">View</span>
          </Link>
          <span>
	          <span
	            className="myDeleteButton"
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
    <div className="mydatatable">
      <div className="mydatatableTitle">
        {type.toUpperCase()}
        <Link to= {"/" + type + "/new"} className="link">
          Add New
        </Link>
      </div>
      <DataGrid className="datagrid" 
        rows={data}
        columns={columns.concat(myActionColumn)}
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

export default MyDatatable;
