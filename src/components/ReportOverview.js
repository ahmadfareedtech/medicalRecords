import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import logo from "./images/logo.png";
import logo2 from "./images/Capture.PNG";

const ReportOverview = ({ open, setOpen, id, name }) => {
  const [showData, setShowData] = useState(false);
  const [objForTest, setObjForTest] = useState([]);
  const [patId, setPatId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [header, setHeader] = useState("");
  const [model, setModel] = useState("");

  //Calcium
  const [calcium, setCalcium] = useState("");
  const [calRow, setCalRow] = useState("");

  //Phosphate
  const [phosphate, setPhosphate] = useState("");
  const [phosRow, setPhosRow] = useState("");

  //Potassium
  const [Potassium, setPotassium] = useState("");
  const [potRow, setPotRow] = useState("");

  //Sodium
  const [sodium, setSodium] = useState("");
  const [sodRow, setsodRow] = useState("");

  //Urinary
  const [urinary, setUrinary] = useState("");
  const [uriRow, setUriRow] = useState("");

  const handleClose = () => {
    setOpen(false);
    setShowData(false);
  };

  let fileReader;

  ////File Reader///////////////////
  const handleFileRead = async (e) => {
    e.preventDefault();
    const content = fileReader.result;
    if (!content) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setShowData(true);
    }
    let con = await content
      .replaceAll("^^^" + 691 + "/50", "Urinary Creatinine")
      .replaceAll("^^^" + 698, "Calcium")
      .replaceAll("^^^" + 714, "Phosphate")
      .replaceAll("^^^" + 708, "Sodium")
      .replaceAll("^^^" + 253, "Potassium");
    console.log(con);

    console.log(content);

    ///////////////////
    console.log(typeof con);
    const myData = con.split(/\r?\n/);
    setHeader(myData[0].replace("Module", "Vandor"));
    setModel(myData[1].replace("Machine", "Model"));
    const ptId = myData[5].split("|");
    setPatId(ptId[26]);

    console.log(myData);
    ///////for calcium row

    function dataF(i, name, row) {
      const calcHead = myData[i].split("|");

      const calc = calcHead.splice(2, 1);
      name(calc.toString().replace("/", ""));

      console.log(calcHead.join(""));
      row(calcHead.splice(2, 2).join(" "));
      console.log(calcHead.splice(2, 3));
    }

    //Potassium
    dataF(7, setPotassium, setPotRow);

    //Calcium
    dataF(9, setCalcium, setCalRow);
    // const calcHead = myData[9].split("|");

    //PhosPhate
    dataF(11, setPhosphate, setPhosRow);

    //Sodium
    dataF(13, setSodium, setsodRow);

    //Urinary
    dataF(15, setUrinary, setUriRow);

    setObjForTest(mycontent);
  };

  useEffect(() => {
    const obj = [
      {
        name: Potassium,
        row: potRow,
      },
      {
        name: calcium,
        row: calRow,
      },
      {
        name: phosphate,
        row: phosRow,
      },
      {
        name: sodium,
        row: sodRow,
      },
      {
        name: urinary,
        row: uriRow,
      },
    ];
    setObjForTest(obj);
  }, [
    calcium,
    calRow,
    phosphate,
    phosRow,
    sodium,
    sodRow,
    urinary,
    uriRow,
    Potassium,
    potRow,
    showData,
  ]);
  const mycontent = objForTest.map((item, index) => {
    return (
      <tr>
        <td
          style={{
            textAlign: " left",
            borderBottom: "1px solid #DDD",
            width: "350px",
          }}
        >
          {item.name}
        </td>
        <td
          style={{
            borderBottom: "1px solid #DDD",
            width: "350px",
            textAlign: "center",
          }}
        >
          {item.row}
        </td>
      </tr>
    );
  });

  //////////file chose///////////
  const handleFileChosen = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} scroll="paper">
        <DialogTitle
          sx={{
            display: "flex",
          }}
        >
          Urinary Test
          <div>
            <img
              src={logo}
              alt="no"
              style={{ height: "30px", width: "100px", marginLeft: "200px" }}
            />
          </div>
        </DialogTitle>

        <DialogContent
          dividers={true}
          sx={{
            direction: "flex",
            width: "400px",
            height: "500px",
            // display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            // margin: "30px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex" }}>
              <input
                type="file"
                id="file"
                className="input-file"
                accept=".txt"
                onChange={handleFileChosen}
              />

              <div>
                <img
                  src={logo2}
                  alt="no"
                  style={{ height: "40px", width: "150px" }}
                />
              </div>
            </div>
          </div>
          <hr />
          {showData && (
            <>
              <div>
                <h5>Patient Details</h5>
                <h6> Case ID : {patId}</h6>
              </div>
              <hr />
              <h5>Test Details</h5>
              <DialogContentText
                id="scroll-dialog-description"
                // ref={descriptionElementRef}
                // tabIndex={-1}
                // sx={{
                //   paddingLeft: "250px",
                // }}
              >
                {!isLoading ? header : <CircularProgress />}
              </DialogContentText>
              <DialogContentText id="scroll-dialog-description">
                {!isLoading ? model : <CircularProgress />}
              </DialogContentText>

              <table style={{ marginTop: "20px" }}>
                <td
                  style={{
                    textAlign: " left",
                    borderBottom: "1px solid #DDD",
                    width: "350px",
                    fontWeight: "bold",
                  }}
                >
                  Electrolyte
                </td>
                <td
                  style={{
                    borderBottom: "1px solid #DDD",
                    width: "350px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Result
                </td>
                {mycontent}
              </table>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReportOverview;
