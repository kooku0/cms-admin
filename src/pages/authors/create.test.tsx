import {
  act, fireEvent, render, screen,
} from '@testing-library/react';

import { postAuthor } from '@/api/author';
import { PostAuthorRequest } from '@/api/author/model';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import CreatePage from './create.page';

jest.mock('@/api/author');

describe('CreatePage', () => {
  const mockAuthor: PostAuthorRequest = {
    name: 'mock-name',
    email: 'mock-email',
    position: 'mock-position',
    team: 'mock-team',
  };

  const renderCreatePage = () => render((
    <ReactQueryWrapper>
      <CreatePage />
    </ReactQueryWrapper>
  ));

  it('author를 생성할 수 있어야한다.', async () => {
    renderCreatePage();

    await act(async () => {
      Object.entries(mockAuthor).forEach(([key, value]) => {
        fireEvent.input(screen.getByLabelText(key), { target: { value } });
      });
      await fireEvent.submit(screen.getByRole('button'));
    });

    expect(postAuthor).toBeCalledWith(mockAuthor);
  });
});