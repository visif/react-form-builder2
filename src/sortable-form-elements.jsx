import FieldSet from './fieldset'
import BaseFormElements from './form-elements'
import CustomElement from './form-elements/custom-element'
import PlaceHolder from './form-place-holder'
import { MultiColumnRow, ThreeColumnRow, TwoColumnRow } from './multi-column'
import SortableElement from './sortable-element'

const {
  Header,
  Paragraph,
  Label,
  LineBreak,
  TextInput,
  EmailInput,
  PhoneNumber,
  NumberInput,
  TextArea,
  Dropdown,
  Checkboxes,
  DatePicker,
  RadioButtons,
  Image,
  Rating,
  Tags,
  Signature,
  HyperLink,
  Download,
  Camera,
  Range,
  FileUpload,
  DataSource,
  Table,
  Signature2,
} = BaseFormElements

const FormElements = {}

FormElements.Header = SortableElement(Header)
FormElements.Paragraph = SortableElement(Paragraph)
FormElements.Label = SortableElement(Label)
FormElements.LineBreak = SortableElement(LineBreak)
FormElements.TextInput = SortableElement(TextInput)
FormElements.EmailInput = SortableElement(EmailInput)
FormElements.PhoneNumber = SortableElement(PhoneNumber)
FormElements.NumberInput = SortableElement(NumberInput)
FormElements.TextArea = SortableElement(TextArea)
FormElements.Dropdown = SortableElement(Dropdown)
FormElements.Signature = SortableElement(Signature)
FormElements.Checkboxes = SortableElement(Checkboxes)
FormElements.DatePicker = SortableElement(DatePicker)
FormElements.RadioButtons = SortableElement(RadioButtons)
FormElements.Image = SortableElement(Image)
FormElements.Rating = SortableElement(Rating)
FormElements.Tags = SortableElement(Tags)
FormElements.HyperLink = SortableElement(HyperLink)
FormElements.Download = SortableElement(Download)
FormElements.Camera = SortableElement(Camera)
FormElements.FileUpload = SortableElement(FileUpload)
FormElements.Range = SortableElement(Range)
FormElements.PlaceHolder = SortableElement(PlaceHolder)
FormElements.FieldSet = SortableElement(FieldSet)
FormElements.TwoColumnRow = SortableElement(TwoColumnRow)
FormElements.ThreeColumnRow = SortableElement(ThreeColumnRow)
FormElements.MultiColumnRow = SortableElement(MultiColumnRow)
FormElements.CustomElement = SortableElement(CustomElement)
FormElements.DataSource = SortableElement(DataSource)
FormElements.Table = SortableElement(Table)
FormElements.Signature2 = SortableElement(Signature2)

export default FormElements
