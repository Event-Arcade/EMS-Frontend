import "./Footer.css";

const FormFooter = () => {
  return (
    <div className="form-footer">
      <div className="sb_footer section_padding">
        <br></br>
        <br></br>
        <hr></hr>
        <div className="sb_footer-below">
          <div className="sb_footer-copyright">
            <p>
              @{new Date().getFullYear()} Event Arcade Media | All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormFooter;
