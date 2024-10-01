import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IntlProvider } from "react-intl";
import Preview from "../preview";
import Toolbar from "../toolbar";
import Registry from "../stores/registry";
import AppLocale from "../language-provider";

const ReactFormBuilder = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [editElement, setEditElement] = useState(null);

  const editModeOn = (data, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (editMode) {
      setEditMode(false);
      setEditElement(null);
    } else {
      setEditMode(true);
      setEditElement(data);
    }
  };

  const manualEditModeOff = () => {
    if (editMode) {
      setEditMode(false);
      setEditElement(null);
    }
  };

  const toolbarProps = {
    showDescription: props.show_description,
    items: props.toolbarItems,
  };

  const language = props.locale || "en";
  const currentAppLocale = AppLocale[language];

  return (
    <DndProvider backend={HTML5Backend} context={window}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <div className="react-form-builder clearfix">
          <div>
            <Preview
              files={props.files}
              manualEditModeOff={manualEditModeOff}
              showCorrectColumn={props.showCorrectColumn}
              parent={null} // Note: 'this' reference removed
              data={props.data}
              url={props.url}
              saveUrl={props.saveUrl}
              onLoad={props.onLoad}
              onPost={props.onPost}
              editModeOn={editModeOn}
              editMode={editMode}
              variables={props.variables}
              registry={Registry}
              editElement={editElement}
              renderEditForm={props.renderEditForm}
              saveAlways={props.saveAlways}
            />
            <Toolbar
              {...toolbarProps}
              customItems={props.customToolbarItems}
            />
          </div>
        </div>
      </IntlProvider>
    </DndProvider>
  );
};

export default ReactFormBuilder;
