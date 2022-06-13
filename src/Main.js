import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
// import logo from "../../Assets/Images/logo.svg";
// import { jsPDF } from "jspdf";
// import { viewImage, viewPDF, DownloadImage } from "../../helper/ImageDownload";
// import { convertUTCToLocal } from "../../helper/time";
// import { CheckIcon, EyeIcon } from "@heroicons/react/outline";
// import { useHistory } from "react-router-dom";
// import { APP_ROUTES } from "../../application/Router/constants/AppRoutes";
// import newLogo from "../../Assets/Images/newLogo.png";
// import { saveAs } from "file-saver";
// import { getChelocationList } from "../../Redux/Actions/patientAction";
// import LabServices from "../../Redux/services/labServices";

export default function DocumentViewLabImage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [download, setDownload] = useState(false);
  const [locationObj, setLocationObj] = useState({});
  const [LabDetailsReport, SetLabDetails] = useState();
  const [imageview, setImageView] = useState();
  const [typeV, setType] = useState();
  const location = useLocation();
  useEffect(() => {
    const userID = location.pathname.split("/")[2];
    dispatch(getChelocationList(userID)).then((result) => {
      setLocationObj(result[0]);
    });
    const ImageFromURL = location.pathname.split("/").pop();
    console.log(ImageFromURL);
    const TypeView = ImageFromURL.split(".")[1];
    setType(
      TypeView.toLowerCase() === "pdf"
        ? "application/pdf"
        : TypeView.toLowerCase() === "jpg"
        ? "image/jpeg"
        : TypeView.toLowerCase() === "jpeg"
        ? "image/jpeg"
        : TypeView.toLowerCase() === "png"
        ? "image/png"
        : TypeView
    );
    setImageView(ImageFromURL);
    if (TypeView === "pdf") {
      const input = document.getElementById("abc");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "A4",
        userUnit: "px",
      });
      setTimeout(() => {
        pdf.html(input, { html2canvas: { scale: 0.38 } }).then(() => {
          pdf.save("test.pdf");
        });
      }, 1000);
    }
  }, []);
  let varLink = process.env.REACT_APP_IMG_BASEURL + imageview;

  const ViewFile = (e) => {
    DownloadImage(e);
    // saveAs(process.env.REACT_APP_IMG_BASEURL + LabDetailsReport.data16Photo, "image.jpg")
  };
  const hperLink = "http://docs.google.com/gview?url=va&embedded=true";

  const Download = (e) => {};

  return (
    <>
      <div className="p-5 bg-white-100 my-10 w-full justify-center mb-2  border dark:border-slate-700">
        {/* <div className="bg-white pt-5 pb-4 sm:pb-4 ">
                    <div className="sm:flex"> */}
        <div className="mt-3 sm:mt-0 sm:ml-2 sm:text-left ">
          {/* <div className="flex mt-5 justify-end">
                        <button
                            onClick={(e) => Download(e)}
                            className="bg-brand-secondary font-rubik text-sm text-white font-normal rounded-md py-2 px-3 mr-2">
                            Download
                        </button>
                    </div> */}

          <div className="p-m-0">
            <div class="lg:flex">
              <div className="w-full">
                <div class="lg:flex lg:pt-1 mt-5 lg:space-x-10 ">
                  {imageview && (
                    <embed
                      class="box target"
                      id="abc"
                      // width="1000"
                      // height="375"
                      style={{ width: "100vw", height: "100vh" }}
                      src={
                        " http://docs.google.com/gview?url=" +
                        process.env.REACT_APP_IMG_BASEURL +
                        imageview +
                        "&embedded=true"
                      }
                      type={typeV}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div>
            </div> */}
    </>
  );
}
