// eslint-disable-next-line max-classes-per-file
import fetch from 'isomorphic-fetch';
import { Blob } from 'buffer';
import { saveAs } from 'file-saver';
import React from 'react';
import Select from 'react-select';
import SignaturePad from 'react-signature-canvas';
import ReactBootstrapSlider from 'react-bootstrap-slider';

import StarRating from './star-rating';
import DatePicker from './date-picker';
import ComponentHeader from './component-header';
import ComponentLabel from './component-label';
import myxss from './myxss';

const FormElements = {};

const Header = (props) => {
  let classNames = 'static';
  if (props.data.bold) {
    classNames += ' bold';
  }
  if (props.data.italic) {
    classNames += ' italic';
  }

  let baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <h3
        className={classNames}
        dangerouslySetInnerHTML={{ __html: myxss.process(props.data.content) }}
      />
    </div>
  );
};

const Paragraph = (props) => {
  let classNames = 'static';
  if (props.data.bold) {
    classNames += ' bold';
  }
  if (props.data.italic) {
    classNames += ' italic';
  }

  let baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <p
        className={classNames}
        dangerouslySetInnerHTML={{ __html: myxss.process(props.data.content) }}
      />
    </div>
  );
};

const Label = (props) => {
  let classNames = 'static';
  if (props.data.bold) {
    classNames += ' bold';
  }
  if (props.data.italic) {
    classNames += ' italic';
  }

  let baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <label
        className={`${classNames} form-label`}
        dangerouslySetInnerHTML={{ __html: myxss.process(props.data.content) }}
      />
    </div>
  );
};

const LineBreak = (props) => {
  let baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <hr />
    </div>
  );
};

const TextInput = (props) => {
  const inputField = React.useRef();

  const inputProps = {
    type: 'text',
    className: 'form-control',
    name: props.data.field_name,
    defaultValue: props.mutable ? props.defaultValue : undefined,
    ref: props.mutable ? inputField : undefined,
    disabled: props.read_only ? 'disabled' : undefined,
  };

  let baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <div className="form-group">
        <ComponentLabel {...props} />
        <input {...inputProps} />
      </div>
    </div>
  );
};

const EmailInput = (props) => {
  const inputField = React.useRef();

  const inputProps = {
    type: 'text',
    className: 'form-control',
    name: props.data.field_name,
    defaultValue: props.mutable ? props.defaultValue : undefined,
    ref: props.mutable ? inputField : undefined,
    disabled: props.read_only ? 'disabled' : undefined,
  };

  let baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <div className="form-group">
        <ComponentLabel {...props} />
        <input {...inputProps} />
      </div>
    </div>
  );
};

const PhoneNumber = (props) => {
  const inputField = React.useRef();

  const inputProps = {
    type: 'tel',
    className: 'form-control',
    name: props.data.field_name,
    defaultValue: props.mutable ? props.defaultValue : undefined,
    ref: props.mutable ? inputField : undefined,
    disabled: props.read_only ? 'disabled' : undefined,
  };

  let baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <div className="form-group">
        <ComponentLabel {...props} />
        <input {...inputProps} />
      </div>
    </div>
  );
};

const NumberInput = (props) => {
  const inputField = React.useRef();

  const inputProps = {
    type: 'number',
    className: 'form-control',
    name: props.data.field_name,
    defaultValue: props.mutable ? props.defaultValue : undefined,
    ref: props.mutable ? inputField : undefined,
    disabled: props.read_only ? 'disabled' : undefined,
  };

  let baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <div className="form-group">
        <ComponentLabel {...props} />
        <input {...inputProps} />
      </div>
    </div>
  );
};

const TextArea = (props) => {
  const inputField = React.useRef();

  const inputProps = {
    className: 'form-control',
    name: props.data.field_name,
    defaultValue: props.mutable ? props.defaultValue : undefined,
    ref: props.mutable ? inputField : undefined,
    disabled: props.read_only ? 'disabled' : undefined,
  };

  let baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <div className="form-group">
        <ComponentLabel {...props} />
        <textarea {...inputProps} />
      </div>
    </div>
  );
};

const Dropdown = (props) => {
  const inputField = React.useRef();

  const selectProps = {
    className: 'form-control',
    name: props.data.field_name,
    defaultValue: props.mutable ? props.defaultValue : undefined,
    ref: props.mutable ? inputField : undefined,
    disabled: props.read_only ? 'disabled' : undefined,
  };

  let baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <div className="form-group">
        <ComponentLabel {...props} />
        <select {...selectProps}>
          {props.data.options.map((option) => {
            const thisKey = `preview_${option.key}`;
            return (
              <option value={option.value} key={thisKey}>
                {option.text}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

class Signature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: props.defaultValue,
    };
    this.inputField = React.createRef();
    this.canvas = React.createRef();
  }

  clear = () => {
    if (this.state.defaultValue) {
      this.setState({ defaultValue: '' });
    } else if (this.canvas.current) {
      this.canvas.current.clear();
    }
  };

  render() {
    const { defaultValue } = this.state;
    let canClear = !!defaultValue;
    const props = {};
    props.type = 'hidden';
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = defaultValue;
      props.ref = this.inputField;
    }
    const pad_props = {};
    // umd requires canvasProps={{ width: 400, height: 150 }}
    if (this.props.mutable) {
      pad_props.defaultValue = defaultValue;
      pad_props.ref = this.canvas;
      canClear = !this.props.read_only;
    }
    pad_props.clearOnResize = false;

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) {
      baseClasses += ' alwaysbreak';
    }

    let sourceDataURL;
    if (defaultValue && defaultValue.length > 0) {
      sourceDataURL = `data:image/png;base64,${defaultValue}`;
    }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          {this.props.read_only === true || !!sourceDataURL ? (
            <img src={sourceDataURL} />
          ) : (
            <SignaturePad {...pad_props} />
          )}
          {canClear && (
            <i
              className="fas fa-times clear-signature"
              onClick={this.clear}
              title="Clear Signature"
            ></i>
          )}
          <input {...props} />
        </div>
      </div>
    );
  }
}

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
    const { defaultValue, data } = props;
    this.state = { value: this.getDefaultValue(defaultValue, data.options) };
  }

  getDefaultValue(defaultValue, options) {
    if (defaultValue) {
      if (typeof defaultValue === 'string') {
        const vals = defaultValue.split(',').map((x) => x.trim());
        return options.filter((x) => vals.indexOf(x.value) > -1);
      }
      return options.filter((x) => defaultValue.indexOf(x.value) > -1);
    }
    return [];
  }

  // state = { value: this.props.defaultValue !== undefined ? this.props.defaultValue.split(',') : [] };

  handleChange = (e) => {
    this.setState({ value: e || [] });
  };

  render() {
    const options = this.props.data.options.map((option) => {
      option.label = option.text;
      return option;
    });
    const props = {};
    props.isMulti = true;
    props.name = this.props.data.field_name;
    props.onChange = this.handleChange;

    props.options = options;
    if (!this.props.mutable) {
      props.value = options[0].text;
    } // to show a sample of what tags looks like
    if (this.props.mutable) {
      props.isDisabled = this.props.read_only;
      props.value = this.state.value;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) {
      baseClasses += ' alwaysbreak';
    }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <Select {...props} />
        </div>
      </div>
    );
  }
}

class Checkboxes extends React.Component {
  constructor(props) {
    super(props);
    this.options = {};
  }

  render() {
    const self = this;
    let classNames = 'custom-control custom-checkbox';
    if (this.props.data.inline) {
      classNames += ' option-inline';
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) {
      baseClasses += ' alwaysbreak';
    }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          {this.props.data.options.map((option) => {
            const this_key = `preview_${option.key}`;
            const props = {};
            props.name = `option_${option.key}`;

            props.type = 'checkbox';
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked =
                self.props.defaultValue !== undefined &&
                self.props.defaultValue.indexOf(option.key) > -1;
            }
            if (this.props.read_only) {
              props.disabled = 'disabled';
            }
            return (
              <div className={classNames} key={this_key}>
                <input
                  id={`fid_${this_key}`}
                  className="custom-control-input"
                  ref={(c) => {
                    if (c && self.props.mutable) {
                      self.options[`child_ref_${option.key}`] = c;
                    }
                  }}
                  {...props}
                />
                <label
                  className="custom-control-label"
                  htmlFor={`fid_${this_key}`}
                >
                  {option.text}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

class RadioButtons extends React.Component {
  constructor(props) {
    super(props);
    this.options = {};
  }

  render() {
    const self = this;
    let classNames = 'custom-control custom-radio';
    if (this.props.data.inline) {
      classNames += ' option-inline';
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) {
      baseClasses += ' alwaysbreak';
    }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          {this.props.data.options.map((option) => {
            const this_key = `preview_${option.key}`;
            const props = {};
            props.name = self.props.data.field_name;

            props.type = 'radio';
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked =
                self.props.defaultValue !== undefined &&
                (self.props.defaultValue.indexOf(option.key) > -1 ||
                  self.props.defaultValue.indexOf(option.value) > -1);
            }
            if (this.props.read_only) {
              props.disabled = 'disabled';
            }

            return (
              <div className={classNames} key={this_key}>
                <input
                  id={`fid_${this_key}`}
                  className="custom-control-input"
                  ref={(c) => {
                    if (c && self.props.mutable) {
                      self.options[`child_ref_${option.key}`] = c;
                    }
                  }}
                  {...props}
                />
                <label
                  className="custom-control-label"
                  htmlFor={`fid_${this_key}`}
                >
                  {option.text}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const Image = (props) => {
  const style = props.data.center ? { textAlign: 'center' } : null;

  let baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div style={{ ...props.style, ...style }} className={baseClasses}>
      <ComponentHeader {...props} />
      {props.data.src ? (
        <img
          src={props.data.src}
          width={props.data.width}
          height={props.data.height}
        />
      ) : (
        <div className="no-image">No Image</div>
      )}
    </div>
  );
};

const Rating = (props) => {
  const inputField = React.createRef();

  const ratingProps = {
    name: props.data.field_name,
    ratingAmount: 5,
    rating: (() => {
      if (props.mutable) {
        return props.defaultValue !== undefined
          ? parseFloat(props.defaultValue, 10)
          : 0;
      }
      return undefined;
    })(),
    editing: props.mutable,
    disabled: props.read_only,
    ref: props.mutable ? inputField : undefined,
  };

  let baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <div className="form-group">
        <ComponentLabel {...props} />
        <StarRating {...ratingProps} />
      </div>
    </div>
  );
};

const HyperLink = (props) => {
  let baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <div className="form-group">
        <label className={'form-label'}>
          <a
            target="_blank"
            href={props.data.href}
            dangerouslySetInnerHTML={{
              __html: myxss.process(props.data.content),
            }}
          />
        </label>
      </div>
    </div>
  );
};

const Download = (props) => {
  let baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <div className="form-group">
        <a href={`${props.download_path}?id=${props.data.file_path}`}>
          {props.data.content}
        </a>
      </div>
    </div>
  );
};

const Camera = (props) => {
  const [img, setImg] = React.useState(null);
  const [previewImg, setPreviewImg] = React.useState(null);

  const displayImage = (e) => {
    const target = e.target;
    if (target.files && target.files.length) {
      setImg(target.files[0]);
      setPreviewImg(URL.createObjectURL(target.files[0]));
    }
  };

  const clearImage = () => {
    setImg(null);
    setPreviewImg(null);
  };

  const getImageSizeProps = ({ width, height }) => {
    const imgProps = { width: '100%' };
    if (width) {
      imgProps.width =
        width < window.innerWidth ? width : 0.9 * window.innerWidth;
    }
    if (height) {
      imgProps.height = height;
    }
    return imgProps;
  };

  const imageStyle = {
    objectFit: 'scale-down',
    objectPosition: props.data.center ? 'center' : 'left',
  };

  let baseClasses = 'SortableItem rfb-item';
  const name = props.data.field_name;
  const fileInputStyle = img ? { display: 'none' } : null;
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  let sourceDataURL;
  if (
    props.read_only === true &&
    props.defaultValue &&
    props.defaultValue.length > 0
  ) {
    if (props.defaultValue.indexOf(name > -1)) {
      sourceDataURL = props.defaultValue;
    } else {
      sourceDataURL = `data:image/png;base64,${props.defaultValue}`;
    }
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <div className="form-group">
        <ComponentLabel {...props} />
        {props.read_only === true &&
        props.defaultValue &&
        props.defaultValue.length > 0 ? (
          <div>
            <img
              style={imageStyle}
              src={sourceDataURL}
              {...getImageSizeProps(props.data)}
            />
          </div>
        ) : (
          <div className="image-upload-container">
            <div style={fileInputStyle}>
              <input
                name={name}
                type="file"
                accept="image/*"
                capture="camera"
                className="image-upload"
                onChange={displayImage}
              />
              <div className="image-upload-control">
                <div className="btn btn-default">
                  <i className="fas fa-camera"></i> Upload Photo
                </div>
                <p>Select an image from your computer or device.</p>
              </div>
            </div>

            {img && (
              <div>
                <img
                  onLoad={() => URL.revokeObjectURL(previewImg)}
                  src={previewImg}
                  height="100"
                  className="image-upload-preview"
                />
                <br />
                <div className="btn btn-image-clear" onClick={clearImage}>
                  <i className="fas fa-times"></i> Clear Photo
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const FileUpload = (props) => {
  const [fileUpload, setFileUpload] = React.useState(null);

  const displayFileUpload = (e) => {
    const target = e.target;
    let file;

    if (target.files && target.files.length > 0) {
      file = target.files[0];
      setFileUpload(file);
    }
  };

  const clearFileUpload = () => {
    setFileUpload(null);
  };

  const saveFile = async (e) => {
    e.preventDefault();
    const sourceUrl = props.defaultValue;
    const response = await fetch(sourceUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      responseType: 'blob',
    });
    const dispositionHeader = response.headers.get('Content-Disposition');
    const resBlob = await response.blob();
    const blob = new Blob([resBlob], {
      type: props.data.fileType || response.headers.get('Content-Type'),
    });
    if (dispositionHeader && dispositionHeader.indexOf(';filename=') > -1) {
      const fileName = dispositionHeader.split(';filename=')[1];
      saveAs(blob, fileName);
    } else {
      const fileName = sourceUrl.substring(sourceUrl.lastIndexOf('/') + 1);
      saveAs(response.url, fileName);
    }
  };

  let baseClasses = 'SortableItem rfb-item';
  const name = props.data.field_name;
  const fileInputStyle = fileUpload ? { display: 'none' } : null;
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <div className="form-group">
        <ComponentLabel {...props} />
        {props.read_only === true &&
        props.defaultValue &&
        props.defaultValue.length > 0 ? (
          <div>
            <button className="btn btn-default" onClick={saveFile}>
              <i className="fas fa-download"></i> Download File
            </button>
          </div>
        ) : (
          <div className="image-upload-container">
            <div style={fileInputStyle}>
              <input
                name={name}
                type="file"
                accept={props.data.fileType || '*'}
                className="image-upload"
                onChange={displayFileUpload}
              />
              <div className="image-upload-control">
                <div className="btn btn-default">
                  <i className="fas fa-file"></i> Upload File
                </div>
                <p>Select a file from your computer or device.</p>
              </div>
            </div>

            {fileUpload && (
              <div>
                <div className="file-upload-preview">
                  <div style={{ display: 'inline-block', marginRight: '5px' }}>
                    {`Name: ${fileUpload.name}`}
                  </div>
                  <div style={{ display: 'inline-block', marginLeft: '5px' }}>
                    {fileUpload.size.length > 6
                      ? `Size:  ${Math.ceil(
                          fileUpload.size / (1024 * 1024)
                        )} mb`
                      : `Size:  ${Math.ceil(fileUpload.size / 1024)} kb`}
                  </div>
                </div>
                <br />
                <div
                  className="btn btn-file-upload-clear"
                  onClick={clearFileUpload}
                >
                  <i className="fas fa-times"></i> Clear File
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Range = (props) => {
  const inputField = React.createRef();
  const [value, setValue] = React.useState(
    props.defaultValue !== undefined
      ? parseInt(props.defaultValue, 10)
      : parseInt(props.data.default_value, 10)
  );

  const changeValue = (e) => {
    const { target } = e;
    setValue(target.value);
  };

  const name = props.data.field_name;

  const rangeProps = {
    type: 'range',
    list: `tickmarks_${name}`,
    min: props.data.min_value,
    max: props.data.max_value,
    step: props.data.step,
    value,
    onChange: changeValue,
  };

  if (props.mutable) {
    rangeProps.ref = inputField;
  }

  const datalist = [];
  for (
    let i = parseInt(rangeProps.min, 10);
    i <= parseInt(rangeProps.max, 10);
    i += parseInt(rangeProps.step, 10)
  ) {
    datalist.push(i);
  }

  const oneBig = 100 / (datalist.length - 1);

  const _datalist = datalist.map((d, idx) => (
    <option key={`${rangeProps.list}_${idx}`}>{d}</option>
  ));

  const visible_marks = datalist.map((d, idx) => {
    const option_props = {};
    let w = oneBig;
    if (idx === 0 || idx === datalist.length - 1) {
      w = oneBig / 2;
    }
    option_props.key = `${rangeProps.list}_label_${idx}`;
    option_props.style = { width: `${w}%` };
    if (idx === datalist.length - 1) {
      option_props.style = { width: `${w}%`, textAlign: 'right' };
    }
    return <label {...option_props}>{d}</label>;
  });

  if (props.read_only) {
    rangeProps.disabled = 'disabled';
  }

  let baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <div className="form-group">
        <ComponentLabel {...props} />
        <div className="range">
          <div className="clearfix">
            <span className="float-left">{props.data.min_label}</span>
            <span className="float-right">{props.data.max_label}</span>
          </div>
          <ReactBootstrapSlider {...rangeProps} />
        </div>
        <div className="visible_marks">{visible_marks}</div>
        <input name={name} value={value} type="hidden" />
        <datalist id={rangeProps.list}>{_datalist}</datalist>
      </div>
    </div>
  );
};

FormElements.Header = Header;
FormElements.Paragraph = Paragraph;
FormElements.Label = Label;
FormElements.LineBreak = LineBreak;
FormElements.TextInput = TextInput;
FormElements.EmailInput = EmailInput;
FormElements.PhoneNumber = PhoneNumber;
FormElements.NumberInput = NumberInput;
FormElements.TextArea = TextArea;
FormElements.Dropdown = Dropdown;
FormElements.Signature = Signature;
FormElements.Checkboxes = Checkboxes;
FormElements.DatePicker = DatePicker;
FormElements.RadioButtons = RadioButtons;
FormElements.Image = Image;
FormElements.Rating = Rating;
FormElements.Tags = Tags;
FormElements.HyperLink = HyperLink;
FormElements.Download = Download;
FormElements.Camera = Camera;
FormElements.FileUpload = FileUpload;
FormElements.Range = Range;

export default FormElements;
