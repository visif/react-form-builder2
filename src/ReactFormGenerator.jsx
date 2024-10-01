import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { EventEmitter } from "fbemitter";
import { injectIntl } from "react-intl";
import FormValidator from "./form-validator";
import FormElements from "./form-elements";
import { TwoColumnRow, ThreeColumnRow, MultiColumnRow } from "./multi-column";
import { FieldSet } from "./fieldset";
import CustomElement from "./form-elements/custom-element";
import Registry from "./stores/registry";

const { Image, Checkboxes, Signature, Download, Camera, FileUpload } =
  FormElements;

const ReactFormGenerator = (props) => {
  const form = useRef(null);
  const inputs = {};
  const [answerData, setAnswerData] = useState({});
  const emitter = new EventEmitter();

  useEffect(() => {
    setAnswerData(convert(props.answer_data));
  }, [props.answer_data]);

  const convert = (answers) => {
    if (Array.isArray(answers)) {
      const result = {};
      answers.forEach((x) => {
        if (x.name.indexOf("tags_") > -1) {
          result[x.name] = x.value.map((y) => y.value);
        } else {
          result[x.name] = x.value;
        }
      });
      return result;
    }
    return answers || {};
  };

  const _getDefaultValue = (item) => {
    return answerData[item.field_name];
  };

  const _optionsDefaultValue = (item) => {
    const defaultValue = _getDefaultValue(item);
    if (defaultValue) {
      return defaultValue;
    }

    const defaultChecked = [];
    item.options.forEach((option) => {
      if (answerData[`option_${option.key}`]) {
        defaultChecked.push(option.key);
      }
    });
    return defaultChecked;
  };

  const _getItemValue = (item, ref, trimValue) => {
    let $item = {
      element: item.element,
      value: "",
    };
    if (item.element === "Rating") {
      $item.value = ref.inputField.current.state.rating;
    } else if (item.element === "Tags") {
      $item.value = ref.inputField.current.state.value;
    } else if (item.element === "DatePicker") {
      $item.value = ref.state.value;
    } else if (item.element === "Camera") {
      $item.value = ref.state.img;
    } else if (item.element === "FileUpload") {
      $item.value = ref.state.fileUpload;
    } else if (ref && ref.inputField && ref.inputField.current) {
      $item = ReactDOM.findDOMNode(ref.inputField.current);
      if (trimValue && $item && typeof $item.value === "string") {
        $item.value = $item.value.trim();
      }
    }
    return $item;
  };

  const _isIncorrect = (item) => {
    let incorrect = false;
    if (item.canHaveAnswer) {
      const ref = inputs[item.field_name];
      if (item.element === "Checkboxes" || item.element === "RadioButtons") {
        item.options.forEach((option) => {
          const $option = ReactDOM.findDOMNode(
            ref.options[`child_ref_${option.key}`]
          );
          if (
            (option.hasOwnProperty("correct") && !$option.checked) ||
            (!option.hasOwnProperty("correct") && $option.checked)
          ) {
            incorrect = true;
          }
        });
      } else {
        const $item = _getItemValue(item, ref);
        if (item.element === "Rating") {
          if ($item.value.toString() !== item.correct) {
            incorrect = true;
          }
        } else if (
          $item.value.toLowerCase() !== item.correct.trim().toLowerCase()
        ) {
          incorrect = true;
        }
      }
    }
    return incorrect;
  };

  const _isInvalid = (item) => {
    let invalid = false;
    if (item.required === true) {
      const ref = inputs[item.field_name];
      if (item.element === "Checkboxes" || item.element === "RadioButtons") {
        let checked_options = 0;
        item.options.forEach((option) => {
          const $option = ReactDOM.findDOMNode(
            ref.options[`child_ref_${option.key}`]
          );
          if ($option.checked) {
            checked_options += 1;
          }
        });
        if (checked_options < 1) {
          invalid = true;
        }
      } else {
        const $item = _getItemValue(item, ref);
        if (item.element === "Rating") {
          if ($item.value === 0) {
            invalid = true;
          }
        } else if ($item.value === undefined || $item.value.length < 1) {
          invalid = true;
        }
      }
    }
    return invalid;
  };

  const _collect = (item, trimValue) => {
    const itemData = {
      id: item.id,
      name: item.field_name,
      custom_name: item.custom_name || item.field_name,
    };
    if (!itemData.name) return null;
    const ref = inputs[item.field_name];
    if (item.element === "Checkboxes" || item.element === "RadioButtons") {
      const checked_options = [];
      item.options.forEach((option) => {
        const $option = ReactDOM.findDOMNode(
          ref.options[`child_ref_${option.key}`]
        );
        if ($option.checked) {
          checked_options.push(option.value);
        }
      });
      itemData.value = checked_options;
    } else {
      if (!ref) return null;
      itemData.value = _getItemValue(item, ref, trimValue).value;
    }
    return itemData;
  };

  const _collectFormData = (data, trimValue) => {
    const formData = [];
    data.forEach((item) => {
      const item_data = _collect(item, trimValue);
      if (item_data) {
        formData.push(item_data);
      }
    });
    return formData;
  };

  const _getSignatureImg = (item) => {
    const ref = inputs[item.field_name];
    const $canvas_sig = ref.canvas.current;
    if ($canvas_sig) {
      const base64 = $canvas_sig
        .toDataURL()
        .replace("data:image/png;base64,", "");
      const isEmpty = $canvas_sig.isEmpty();
      const $input_sig = ReactDOM.findDOMNode(ref.inputField.current);
      if (isEmpty) {
        $input_sig.value = "";
      } else {
        $input_sig.value = base64;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = [];
    if (!props.skip_validations) {
      errors = validateForm();
      emitter.emit("formValidation", errors);
    }

    if (errors.length < 1) {
      const { onSubmit } = props;
      if (onSubmit) {
        const data = _collectFormData(props.data, true);
        onSubmit(data);
      } else {
        const $form = ReactDOM.findDOMNode(form.current);
        $form.submit();
      }
    }
  };

  const handleBlur = (event) => {
    if (props.onBlur) {
      const { onBlur } = props;
      const data = _collectFormData(props.data, true);
      onBlur(data);
    }
  };

  const handleChange = (event) => {
    if (props.onChange) {
      const { onChange } = props;
      const data = _collectFormData(props.data, false);
      onChange(data);
    }
  };

  const validateForm = () => {
    const errors = [];
    let data_items = props.data;
    const { intl } = props;

    if (props.display_short) {
      data_items = props.data.filter((i) => i.alternateForm === true);
    }

    data_items.forEach((item) => {
      if (item.element === "Signature") {
        _getSignatureImg(item);
      }

      if (_isInvalid(item)) {
        errors.push(
          `${item.label} ${intl.formatMessage({ id: "message.is-required" })}!`
        );
      }

      if (item.element === "EmailInput") {
        const ref = inputs[item.field_name];
        const emailValue = _getItemValue(item, ref).value;
        if (emailValue) {
          const validateEmail = (email) =>
            email.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
          const checkEmail = validateEmail(emailValue);
          if (!checkEmail) {
            errors.push(
              `${item.label} ${intl.formatMessage({
                id: "message.invalid-email",
              })}`
            );
          }
        }
      }

      if (item.element === "PhoneNumber") {
        const ref = inputs[item.field_name];
        const phoneValue = _getItemValue(item, ref).value;
        if (phoneValue) {
          const validatePhone = (phone) =>
            phone.match(
              /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g
            );
          const checkPhone = validatePhone(phoneValue);
          if (!checkPhone) {
            errors.push(
              `${item.label} ${intl.formatMessage({
                id: "message.invalid-phone-number",
              })}`
            );
          }
        }
      }

      if (props.validateForCorrectness && _isIncorrect(item)) {
        errors.push(
          `${item.label} ${intl.formatMessage({
            id: "message.was-answered-incorrectly",
          })}!`
        );
      }
    });

    return errors;
  };

  const getDataById = (id) => {
    const { data } = props;
    return data.find((x) => x.id === id);
  };

  const getInputElement = (item) => {
    if (item.custom) {
      return getCustomElement(item);
    }
    const Input = FormElements[item.element];
    return (
      <Input
        handleChange={handleChange}
        ref={(c) => (inputs[item.field_name] = c)}
        mutable={true}
        key={`form_${item.id}`}
        data={item}
        read_only={props.read_only}
        defaultValue={_getDefaultValue(item)}
      />
    );
  };

  const getContainerElement = (item, Element) => {
    const controls = item.childItems.map((x) =>
      x ? getInputElement(getDataById(x)) : <div>&nbsp;</div>
    );
    return (
      <Element
        mutable={true}
        key={`form_${item.id}`}
        data={item}
        controls={controls}
      />
    );
  };

  const getSimpleElement = (item) => {
    const Element = FormElements[item.element];
    return <Element mutable={true} key={`form_${item.id}`} data={item} />;
  };

  const getCustomElement = (item) => {
    const { intl } = props;

    if (!item.component || typeof item.component !== "function") {
      item.component = Registry.get(item.key);
      if (!item.component) {
        console.error(
          `${item.element} ${intl.formatMessage({
            id: "message.was-not-registered",
          })}`
        );
      }
    }

    const inputProps = item.forwardRef && {
      handleChange: handleChange,
      defaultValue: _getDefaultValue(item),
      ref: (c) => (inputs[item.field_name] = c),
    };
    return (
      <CustomElement
        mutable={true}
        read_only={props.read_only}
        key={`form_${item.id}`}
        data={item}
        {...inputProps}
      />
    );
  };

  const handleRenderSubmit = () => {
    const name = props.action_name || props.actionName;
    const actionName = name || "Submit";
    const { submitButton = false } = props;

    return (
      submitButton || (
        <input type="submit" className="btn btn-big" value={actionName} />
      )
    );
  };

  const handleRenderBack = () => {
    const name = props.back_name || props.backName;
    const backName = name || "Cancel";
    const { backButton = false } = props;

    return (
      backButton || (
        <a
          href={props.back_action}
          className="btn btn-default btn-cancel btn-big"
        >
          {backName}
        </a>
      )
    );
  };

  const render = () => {
    let data_items = props.data;

    if (props.display_short) {
      data_items = props.data.filter((i) => i.alternateForm === true);
    }

    data_items.forEach((item) => {
      if (
        item &&
        item.readOnly &&
        item.variableKey &&
        props.variables[item.variableKey]
      ) {
        answerData[item.field_name] = props.variables[item.variableKey];
      }
    });

    const items = data_items
      .filter((x) => !x.parentId)
      .map((item) => {
        if (!item) return null;
        switch (item.element) {
          case "TextInput":
          case "EmailInput":
          case "PhoneNumber":
          case "NumberInput":
          case "TextArea":
          case "Dropdown":
          case "DatePicker":
          case "RadioButtons":
          case "Rating":
          case "Tags":
          case "Range":
            return getInputElement(item);
          case "CustomElement":
            return getCustomElement(item);
          case "MultiColumnRow":
            return getContainerElement(item, MultiColumnRow);
          case "ThreeColumnRow":
            return getContainerElement(item, ThreeColumnRow);
          case "TwoColumnRow":
            return getContainerElement(item, TwoColumnRow);
          case "FieldSet":
            return getContainerElement(item, FieldSet);
          case "Signature":
            return (
              <Signature
                ref={(c) => (inputs[item.field_name] = c)}
                read_only={props.read_only || item.readOnly}
                mutable={true}
                key={`form_${item.id}`}
                data={item}
                defaultValue={_getDefaultValue(item)}
              />
            );
          case "Checkboxes":
            return (
              <Checkboxes
                ref={(c) => (inputs[item.field_name] = c)}
                read_only={props.read_only}
                handleChange={handleChange}
                mutable={true}
                key={`form_${item.id}`}
                data={item}
                defaultValue={_optionsDefaultValue(item)}
              />
            );
          case "Image":
            return (
              <Image
                ref={(c) => (inputs[item.field_name] = c)}
                handleChange={handleChange}
                mutable={true}
                key={`form_${item.id}`}
                data={item}
                defaultValue={_getDefaultValue(item)}
              />
            );
          case "Download":
            return (
              <Download
                download_path={props.download_path}
                mutable={true}
                key={`form_${item.id}`}
                data={item}
              />
            );
          case "Camera":
            return (
              <Camera
                ref={(c) => (inputs[item.field_name] = c)}
                read_only={props.read_only || item.readOnly}
                mutable={true}
                key={`form_${item.id}`}
                data={item}
                defaultValue={_getDefaultValue(item)}
              />
            );
          case "FileUpload":
            return (
              <FileUpload
                ref={(c) => (inputs[item.field_name] = c)}
                read_only={props.read_only || item.readOnly}
                mutable={true}
                key={`form_${item.id}`}
                data={item}
                defaultValue={_getDefaultValue(item)}
              />
            );
          default:
            return getSimpleElement(item);
        }
      });

    const formTokenStyle = {
      display: "none",
    };

    return (
      <div>
        <FormValidator emitter={emitter} />
        <div className="react-form-builder-form">
          <form
            encType="multipart/form-data"
            ref={form}
            action={props.form_action}
            onBlur={handleBlur}
            onChange={handleChange}
            onSubmit={handleSubmit}
            method={props.form_method}
          >
            {props.authenticity_token && (
              <div style={formTokenStyle}>
                <input name="utf8" type="hidden" value="&#x2713;" />
                <input
                  name="authenticity_token"
                  type="hidden"
                  value={props.authenticity_token}
                />
                <input name="task_id" type="hidden" value={props.task_id} />
              </div>
            )}
            {items}
            <div className="btn-toolbar">
              {!props.hide_actions && handleRenderSubmit()}
              {!props.hide_actions && props.back_action && handleRenderBack()}
            </div>
          </form>
        </div>
      </div>
    );
  };

  return render();
};

export default injectIntl(ReactFormGenerator);

ReactFormGenerator.defaultProps = {
  validateForCorrectness: false,
};
