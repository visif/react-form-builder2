import React from 'react';
import store from './src/stores/store';
import { ReactFormGenerator } from './src/index';

const answers = {};

export default class Demobar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    };

    const update = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    store.subscribe((state) => update(state.payload));
  }

  showPreview() {
    this.saveFormData();
    this.setState({
      previewVisible: true,
    });
  }

  showShortPreview() {
    this.saveFormData();
    this.setState({
      shortPreviewVisible: true,
    });
  }

  showRoPreview() {
    this.saveFormData();
    this.setState({
      roPreviewVisible: true,
    });
  }

  closePreview() {
    this.setState({
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    });
  }

  _onChange(payload) {
    const { data: newData } = payload || { data: [] };

    this.setState({
      data: newData,
    });
  }

  // eslint-disable-next-line no-unused-vars
  _onSubmit(data) {
    console.log('onSubmit', data);
    // Place code to post json data to server here
  }

  saveFormData() {
    store.dispatch('post');
  }

  getDataSource(data) {
    if (data?.sourceType === 'name') {
      return [
        { id: 1, name: 'NameA lastNameA' },
        { id: 2, name: 'NameB lastNameB' },
      ];
    }

    if (data?.sourceType === 'department') {
      return [
        { id: 1, name: 'departmentA' },
        { id: 2, name: 'departmentB' },
      ];
    }

    if (data?.sourceType === 'role') {
      return [
        { id: 1, name: 'roleA' },
        { id: 2, name: 'roleB' },
      ];
    }

    if (data?.sourceType === 'form') {
      return [
        { id: 1, name: 'formA' },
        { id: 2, name: 'formB' },
      ];
    }

    return [];
  }

  getActiveUserProperties = () => ({
    name: 'test',
    userId: 'id001',
  })

  render() {
    let modalClass = 'modal';
    if (this.state.previewVisible) {
      modalClass += ' show d-block';
    }

    let shortModalClass = 'modal short-modal';
    if (this.state.shortPreviewVisible) {
      shortModalClass += ' show d-block';
    }

    let roModalClass = 'modal ro-modal';
    if (this.state.roPreviewVisible) {
      roModalClass += ' show d-block';
    }

    return (
      <div className="clearfix" style={{ margin: '10px', width: '70%' }}>
        <h4 className="float-left">Preview</h4>
        <button
          className="btn btn-primary float-right"
          style={{ marginRight: '10px' }}
          onClick={() => this.showPreview()}
        >
          Preview Form
        </button>
        <button
          className="btn btn-default float-right"
          style={{ marginRight: '10px' }}
          onClick={() => this.showShortPreview()}
        >
          Alternate/Short Form
        </button>
        <button
          className="btn btn-default float-right"
          style={{ marginRight: '10px' }}
          onClick={() => this.showRoPreview()}
        >
          Read Only Form
        </button>
        <button
          className="btn btn-default float-right"
          style={{ marginRight: '10px' }}
          onClick={() => this.saveFormData()}
        >
          Save Form
        </button>

        {this.state.previewVisible && (
          <div className={modalClass} role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path=""
                  back_action="/"
                  back_name="Back"
                  answer_data={answers}
                  action_name="Save"
                  form_action="/api/form"
                  form_method="POST"
                  onSubmit={this._onSubmit}
                  variables={this.props.variables}
                  data={this.state.data}
                  locale="en"
                  getDataSource={this.getDataSource}
                  getActiveUserProperties={this.getActiveUserProperties}
                />
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.roPreviewVisible && (
          <div className={roModalClass}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path=""
                  back_action="/"
                  back_name="Back"
                  answer_data={answers}
                  action_name="Save"
                  form_action="/"
                  form_method="POST"
                  read_only={true}
                  variables={this.props.variables}
                  hide_actions={true}
                  data={this.state.data}
                  locale="en"
                  getDataSource={this.getDataSource}
                  getActiveUserProperties={this.getActiveUserProperties}
                />
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.shortPreviewVisible && (
          <div className={shortModalClass}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content border border-light p-3 mb-4">
                <ReactFormGenerator
                  download_path=""
                  back_action=""
                  answer_data={answers}
                  form_action="/"
                  form_method="POST"
                  data={this.state.data}
                  display_short={true}
                  variables={this.props.variables}
                  hide_actions={false}
                  locale="en"
                  getDataSource={this.getDataSource}
                  getActiveUserProperties={this.getActiveUserProperties}
                />
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
