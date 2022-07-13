import { ChangeEventHandler } from 'react';

import styled from '@emotion/styled';
import { Input, Spacer, Textarea } from '@nextui-org/react';
import { useRecoilState } from 'recoil';

import postFormState from '@/recoil/post/create/atom';

import AuthorSelect from './AuthorSelect';
import TagInput from './TagInput';

function PostForm() {
  const [{ title, html }, setPostForm] = useRecoilState(postFormState);

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setPostForm((prev) => ({ ...prev, title: target.value }));
  };

  const handleHtmlChange: ChangeEventHandler<HTMLTextAreaElement> = ({ target }) => {
    setPostForm((prev) => ({ ...prev, html: target.value }));
  };

  return (
    <Form>
      <Input bordered fullWidth color="primary" placeholder="title" size="xl" animated={false} value={title} onChange={handleTitleChange} />
      <Spacer y={0.5} />
      <AuthorSelect />
      <Spacer y={0.5} />
      <TagInput />
      <Spacer y={0.5} />
      <Textarea autoComplete="off" fullWidth placeholder="Enter contents" shadow={false} animated={false} value={html} onChange={handleHtmlChange} />
    </Form>
  );
}

export default PostForm;

const Form = styled.form`
  padding: 16px;
  height: 100%;
`;