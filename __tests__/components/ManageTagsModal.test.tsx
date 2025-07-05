import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ManageTagsModal } from '@/features/Records/ManageTagsModal';
import { useManageTags } from '@/shared/hooks/useManageTags';

const ManageTagsModalWrapper = () => {
  const { openTagModal, toggleTagModal, tags, updateTags } = useManageTags();

  return (
    <ManageTagsModal
      openModal={openTagModal}
      toggleModal={toggleTagModal}
      tags={tags.current}
      updateTags={updateTags}
    />
  );
};

describe('ManageTagsModal', () => {
  it('should open the modal when clicking the button', async () => {
    const user = userEvent.setup();
    render(<ManageTagsModalWrapper />);

    const openModalButton = screen.getByRole('button', { name: /Crear etiquetas/i });
    await user.click(openModalButton);

    const modalTitle = await screen.findByRole('heading', { name: /Agregar etiqueta/i });
    expect(modalTitle).toBeInTheDocument();
  });

  it('should add a tag when submitting the form', async () => {
    const user = userEvent.setup();
    render(<ManageTagsModalWrapper />);

    const openModalButton = screen.getByRole('button', { name: /Crear etiquetas/i });
    await user.click(openModalButton);

    const tagInput = await screen.findByTestId('tag');
    await user.type(tagInput, 'new tag');

    const addTagButton = await screen.findByRole('button', { name: /Agregar etiqueta/i });
    await user.click(addTagButton);

    const newTagBadge = await screen.findByText(/new tag/i);
    expect(newTagBadge).toBeInTheDocument();
  });

  it('should remove a tag when clicking the close icon', async () => {
    const user = userEvent.setup();
    render(<ManageTagsModalWrapper />);

    const openModalButton = screen.getByRole('button', { name: /Crear etiquetas/i });
    await user.click(openModalButton);

    const tagInput = await screen.findByTestId('tag');
    await user.type(tagInput, 'tag to remove');

    const addTagButton = await screen.findByRole('button', { name: /Agregar etiqueta/i });
    await user.click(addTagButton);

    const tagToRemove = await screen.findByText(/tag to remove/i);
    expect(tagToRemove).toBeInTheDocument();

    const removeButton = await screen.findByRole('button', { name: /Remove tag to remove/i });
    await user.click(removeButton);

    expect(screen.queryByText(/tag to remove/i)).not.toBeInTheDocument();
  });

  describe('Form validations', () => {
    it('should show required error if input is empty', async () => {
      const user = userEvent.setup();
      render(<ManageTagsModalWrapper />);

      const openModalButton = screen.getByRole('button', { name: /Crear etiquetas/i });
      await user.click(openModalButton);

      const addTagButton = await screen.findByRole('button', { name: /Agregar etiqueta/i });
      await user.click(addTagButton);

      expect(await screen.findByText(/Por favor, ingrese una etiqueta/i)).toBeInTheDocument();
    });

    it('should show min length error if tag is too short', async () => {
      const user = userEvent.setup();
      render(<ManageTagsModalWrapper />);

      const openModalButton = screen.getByRole('button', { name: /Crear etiquetas/i });
      await user.click(openModalButton);

      const tagInput = await screen.findByTestId('tag');
      await user.type(tagInput, 'a');

      const addTagButton = await screen.findByRole('button', { name: /Agregar etiqueta/i });
      await user.click(addTagButton);

      expect(await screen.findByText(/Por favor, ingrese una etiqueta de más de 3 caracteres/i)).toBeInTheDocument();
    });

    it.only('should show max length error if tag is too long', async () => {
      const user = userEvent.setup();
      render(<ManageTagsModalWrapper />);

      const openModalButton = screen.getByRole('button', { name: /Crear etiquetas/i });
      await user.click(openModalButton);

      const tagInput = await screen.findByTestId('tag');
      await user.type(tagInput, 'this is a very long input that exceeds the maximum length of fifty characters');

      const addTagButton = await screen.findByRole('button', { name: /Agregar etiqueta/i });
      await user.click(addTagButton);

      expect(await screen.findByText(/Por favor, ingrese una etiqueta con menos de 50 caracteres/i)).toBeInTheDocument();
    });

    it('should clear the error when user types', async () => {
      const user = userEvent.setup();
      render(<ManageTagsModalWrapper />);

      const openModalButton = screen.getByRole('button', { name: /Crear etiquetas/i });
      await user.click(openModalButton);

      const addTagButton = await screen.findByRole('button', { name: /Agregar etiqueta/i });
      await user.click(addTagButton);

      expect(await screen.findByText(/Por favor, ingrese una etiqueta/i)).toBeInTheDocument();

      const tagInput = await screen.findByTestId('tag');
      await user.type(tagInput, 'a');

      expect(screen.queryByText(/Por favor, ingrese una etiqueta/i)).not.toBeInTheDocument();
    });
  });
});
