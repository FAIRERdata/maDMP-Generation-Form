import React from 'react';

interface ModalContentProps {
  onClose: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({ onClose }) => {
  return (
    <div>
      <div className="modal-header">
        <p className="modal-title" id="modal-title-1">Author Statement</p>
      </div>
      <div className="modal-body" id="modal-body-1">
        <p style={{ marginLeft: '25px' }}>
            <a href="https://orcid.org/0009-0009-8120-5107">
                Henry Zhang 
                <img alt="ORCID logo" src="https://info.orcid.org/wp-content/uploads/2019/11/orcid_16x16.png" width="16" height="16" />
            </a> (Data curation, Software, Visualization) ; <br />
            <a href="https://orcid.org/0000-0002-7349-6970">
                Dominique Charles 
                <img alt="ORCID logo" src="https://info.orcid.org/wp-content/uploads/2019/11/orcid_16x16.png" width="16" height="16" />
            </a> (Supervision, Validation) ; and,<br />
            <a href="https://orcid.org/0000-0001-9138-5986">
                Claire C. Austin 
                <img alt="ORCID logo" src="https://info.orcid.org/wp-content/uploads/2019/11/orcid_16x16.png" width="16" height="16" />
            </a> (Supervision, Writing).<br />
        </p>
        <p style={{ marginLeft: '25px' }}>
          In keeping with the <a href="https://github.com/FAIRsFAIR/fair-aware/blob/master/LICENSE" target="_blank">FAIRsFAIR MIT licence <i className="fa fa-external-link"></i></a>, ...
        </p>
        <p style={{ marginLeft: '25px' }}>(Not yet)All authors reviewed, discussed, and agreed to all aspects of the final work.</p>
        <p style={{ marginLeft: '25px' }}>
        (Not yet) All views and opinions expressed are those of the co-authors, and do not necessarily reflect the official policy or position of their respective employers, or of any government, agency, or organization.
        </p>
        <p>Cite as: ??????</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ModalContent;
