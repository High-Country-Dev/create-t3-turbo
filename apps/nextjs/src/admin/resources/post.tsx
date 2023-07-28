import ArticleIcon from "@mui/icons-material/Article";
import type { ListProps, ResourceProps, ShowProps } from "react-admin";
import {
  Create,
  DatagridConfigurable,
  DateField,
  DateTimeInput,
  Edit,
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
        <TextField source="title" />
        <TextField source="content" />
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
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="content" />
        <DateField source="createdAt" showTime />
        <TextField source="updatedAt" showTime />
      </DatagridConfigurable>
    </List>
  );
};

const PostCreate = () => {
  return (
    <Create redirect="show">
      <SimpleForm>
        <TextInput source="title" />
        <TextInput source="content" />
      </SimpleForm>
    </Create>
  );
};

const PostEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" />
        <TextInput source="title" />
        <TextInput source="content" />
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
  icon: ArticleIcon,
};

export default resourceProps;
