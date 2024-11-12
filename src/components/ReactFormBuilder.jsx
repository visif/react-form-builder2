import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IntlProvider } from 'react-intl';
import AppLocale from '../language-provider';
import Preview from '../preview';
import Registry from '../stores/registry';
import Toolbar from '../toolbar';

const ReactFormBuilder = (props) => {
  const { locale } = props;

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

  const currentAppLocale = AppLocale[locale || 'en'];

  return (
    <DndProvider backend={HTML5Backend} context={window}>
      <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
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
              getDataSource={props.getDataSource}
              getActiveUserProperties={props.getActiveUserProperties}
              onImageUpload={props.onImageUpload}
            />
            <Toolbar {...toolbarProps} customItems={props.customToolbarItems} />
          </div>
        </div>
      </IntlProvider>
    </DndProvider>
  );
};

export default ReactFormBuilder;
