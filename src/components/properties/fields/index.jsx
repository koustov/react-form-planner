import * as React from "react";
import { FPCheckbox, FPFormControlLabel, FPHeaderField, FPLabelField, FPTextField, FPNoContentAvailable } from "../../styled";
import FPDataGrid from "./FPDataGrid";
import FPDropzoneDialog from "./FPDropzoneDialog";
import FPPdfViewer from "./FPPdfViewer";
import { FaImage, FaVideo, FaFilePdf } from 'react-icons/fa';
import ReactPlayer from 'react-player'



const getStyleObject = (style) => {
  const res = {};
  if (style) {
    style.forEach((s) => {
      res[s["name"]] = s["value"];
    })
  }
  return res;
}
export const getFinalField = (infield, onValueChange, invalue, label, fieldname) => {
  let resComponent = {};
  const field = Object.assign({}, infield);
  const strFieldName = fieldname ? fieldname : field.datafield;
  if (!field.custom) {
    field.custom = {
      style: [],
      props: []
    }
  }

  const value = invalue || field.value;

  const localprops = {
    style: getStyleObject(field.custom.style),
    ...field.custom.props
  }
  switch (field.type) {
    case "text": resComponent = <FPTextField id={`text-field-${strFieldName}`}

      label={`${label || field.label}`}
      value={value}
      onChange={(e) => {
        if (onValueChange) {
          onValueChange(strFieldName, e.target.value, field)
        }
      }}
      type={field.subtype || "text"}
      fullWidth
      size="small"
      variant="outlined"
      {...localprops} />
      break;
    case "divider": resComponent = <hr className="MuiDivider-root" {...localprops} />
      break;
    case "header": resComponent = <FPHeaderField {...localprops} >{label || field.label}</FPHeaderField>
      break;
    case "label": resComponent = <FPLabelField {...localprops}>{label || field.label}</FPLabelField>
      break;
    case "checkbox": resComponent = (
      <div><FPFormControlLabel control={
        <FPCheckbox
          checked={value}
          onChange={(e) => {
            if (onValueChange) {
              onValueChange(strFieldName, e.target.checked, field)
            }
          }}
          name="checkedB"
          color="primary"
          {...localprops}
        />
      }
        label={`${label || field.label}`}></FPFormControlLabel>
      </div>
    )
    case "textarea": resComponent = <FPTextField label={`${label || field.label}`}
      multiline
      value={value}
      onChange={(e) => {
        if (onValueChange) {
          onValueChange(strFieldName, e.target.value, field)
        }
      }}
      fullWidth
      size="small"
      variant="outlined"
      {...localprops}
    />
      break;
    case "grid": resComponent = (
      <FPDataGrid
        onChange={(fld, val, fielddata) => {
          if (onValueChange) {
            onValueChange(fld, val, fielddata)
          }
        }}
        field={field}
        columns={[
          { field: 'name', headerName: 'Property Name', width: 180, editable: true },
          { field: 'value', headerName: 'Value', width: 180, editable: true },
        ]}
        rows={value && value.length ? value : []}
        {...localprops}
      />)
      break;
    case "fileupload": resComponent = (
      <FPDropzoneDialog
        onChange={(fld, val, fielddata) => {
          if (onValueChange) {
            onValueChange(fld, val, fielddata)
          }
        }}
        field={field}
        {...localprops}
      />)
      break;
    case "image": resComponent = (
      <React.Fragment>
        {value && value.length ? (<React.Fragment>
          {value.map((f, fi) => {
            return <div key={fi}>
              <img src={`${f}`} alt={f} {...localprops}></img>
            </div>
          })}
        </React.Fragment>) : (
          <FPNoContentAvailable>
            <div><FaImage /></div>
            <div>NO IMAGE SELECTED</div>
          </FPNoContentAvailable>
        )}
      </React.Fragment>
    )
      break;
    case "video": resComponent = (
      <React.Fragment>
        {value ? (<ReactPlayer url={`${value}`} />) : (
          <FPNoContentAvailable>
            <div><FaVideo /></div>
            <div >NO VIDEO SELECTED</div>
          </FPNoContentAvailable>
        )}
      </React.Fragment>
    )
      break;
    case "pdf": resComponent = (
      <React.Fragment>
        {value ? (<FPPdfViewer value={value} />) : (
          <FPNoContentAvailable>
            <div><FaFilePdf /></div>
            <div >NO PDF FILE SELECTED</div>
          </FPNoContentAvailable>
        )}
      </React.Fragment>

    )
      break;

    default: resComponent = <React.Fragment></React.Fragment>

  }
  return resComponent;
}
