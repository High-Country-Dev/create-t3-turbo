import PersonIcon from "@mui/icons-material/Person";
import type { ListProps, ResourceProps, ShowProps } from "react-admin";
import {
  BooleanField,
  BooleanInput,
  Create,
  DatagridConfigurable,
  DateField,
  DateTimeInput,
  Edit,
  email,
  EmailField,
  List,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from "react-admin";

import { DefaultListActions } from "../components/DefaultListActions";
import { Wrap } from "../components/Wrap";

export const PostShow = (props: Omit<ShowProps, "children">) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" />
        <EmailField source="email" />
        <BooleanField source="emailVerified" />
        <TextField source="image" />
        <DateField source="createdAt" />
        <TextField source="updatedAt" />
      </SimpleShowLayout>
    </Show>
  );
};

export const PostList = (props: Omit<ListProps, "children">) => {
  const filters = [<TextInput key="1" label="Search" source="q" alwaysOn />];

  return (
    <List actions={<DefaultListActions />} filters={filters} {...props}>
      <DatagridConfigurable
        omit={["id", "updatedAt", "createdAt"]}
        rowClick="show"
      >
        <TextField source="id" label="Id" />
        <TextField source="name" label="Name" />
        <TextField source="email" label="Email" />
        <DateField source="updatedAt" showTime />
        <DateField source="createdAt" showTime />
      </DatagridConfigurable>
    </List>
  );
};

const PostCreate = () => {
  return (
    <Create redirect="show">
      <SimpleForm>
        <TextInput source="email" required validate={email()} />
        <TextInput source="name" />
      </SimpleForm>
    </Create>
  );
};

const PostEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" />
        <TextInput source="name" />
        <TextInput source="email" />
        <BooleanInput source="emailVerified" />
        <TextInput source="image" />
        <DateTimeInput source="createdAt" />
        <DateTimeInput source="updatedAt" />
      </SimpleForm>
    </Edit>
  );
};

const resourceProps: ResourceProps = {
  name: "post",
  list: Wrap(PostList),
  show: Wrap(PostShow),
  create: Wrap(PostCreate),
  edit: Wrap(PostEdit),
  recordRepresentation: "email",
  icon: PersonIcon,
};

export default resourceProps;
