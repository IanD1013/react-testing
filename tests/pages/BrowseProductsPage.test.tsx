import { Theme } from '@radix-ui/themes';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Category, Product } from '../../src/entities';
import BrowseProducts from '../../src/pages/BrowseProductsPage';
import { CartProvider } from '../../src/providers/CartProvider';
import { db } from '../mocks/db';
import { simulateDelay, simulateError } from '../utils';

describe('BrowseProductPage', () => {
  const categories: Category[] = [];
  const products: Product[] = [];

  beforeAll(() => {
    [1, 2].forEach((item) => {
      const category = db.category.create({ name: 'Category ' + item });
      categories.push(category);
      [1, 2].forEach(() => {
        products.push(db.product.create({ categoryId: category.id }));
      });
    });
  });

  afterAll(() => {
    const categoryIds = categories.map((c) => c.id);
    db.category.deleteMany({ where: { id: { in: categoryIds } } });

    const productIds = products.map((p) => p.id);
    db.product.deleteMany({ where: { id: { in: productIds } } });
  });

  const renderComponent = () => {
    render(
      <CartProvider>
        <Theme>
          <BrowseProducts />
        </Theme>
      </CartProvider>
    );

    return {
      getProductsSkeleton: () => screen.getByRole('progressbar', { name: /products/i }),
      getCategoriesSkeleton: () => screen.getByRole('progressbar', { name: /categories/i }),
      getCategoriesCombobox: () => screen.queryByRole('combobox'),
    };
  };

  it('should show a loading skeleton when fetching categories', () => {
    simulateDelay('/categories');

    const { getProductsSkeleton } = renderComponent();

    expect(getProductsSkeleton()).toBeInTheDocument();
  });

  it('should hide the loading skeleton after categories are fetched', async () => {
    const { getProductsSkeleton } = renderComponent();

    await waitForElementToBeRemoved(getProductsSkeleton);
  });

  it('should show a loading skeleton when fetching products', () => {
    simulateDelay('/products');

    renderComponent();

    expect(screen.getByRole('progressbar', { name: /products/i })).toBeInTheDocument();
  });

  it('should hide the loading skeleton after products are fetched', async () => {
    renderComponent();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar', { name: /products/i }));
  });

  it('should not render an error if categories cannot be fetched', async () => {
    simulateError('/categories');

    const { getCategoriesSkeleton, getCategoriesCombobox } = renderComponent();

    await waitForElementToBeRemoved(getCategoriesSkeleton);

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    expect(getCategoriesCombobox()).not.toBeInTheDocument();
  });

  it('should render an error if products cannot be fetched', async () => {
    simulateError('/products');

    renderComponent();

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it('should render categories', async () => {
    const { getCategoriesSkeleton, getCategoriesCombobox } = renderComponent();
    await waitForElementToBeRemoved(getCategoriesSkeleton);

    const combobox = getCategoriesCombobox();
    expect(combobox).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(combobox!);

    expect(screen.getByRole('option', { name: /all/i })).toBeInTheDocument();
    categories.forEach((category) => {
      expect(screen.getByRole('option', { name: category.name })).toBeInTheDocument();
    });
  });

  it('should render products', async () => {
    const { getProductsSkeleton } = renderComponent();

    await waitForElementToBeRemoved(getProductsSkeleton);

    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });

  it('should filter products by category', async () => {
    const { getCategoriesSkeleton, getCategoriesCombobox } = renderComponent();

    // Arrange
    await waitForElementToBeRemoved(getCategoriesSkeleton);
    const combobox = getCategoriesCombobox();
    const user = userEvent.setup();
    await user.click(combobox!);

    // Act
    const selectedCategory = categories[0];
    const option = screen.getByRole('option', { name: selectedCategory.name });
    await user.click(option);

    // Assert
    const products = db.product.findMany({
      where: {
        categoryId: { equals: selectedCategory.id },
      },
    });

    const rows = screen.getAllByRole('row');
    const dataRows = rows.slice(1);
    expect(dataRows).toHaveLength(products.length);

    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });

  it('should render all products if All category is selected', async () => {
    const { getCategoriesSkeleton, getCategoriesCombobox } = renderComponent();

    // Arrange
    await waitForElementToBeRemoved(getCategoriesSkeleton);
    const combobox = getCategoriesCombobox();
    const user = userEvent.setup();
    await user.click(combobox!);

    // Act
    const option = screen.getByRole('option', { name: /all/i });
    await user.click(option);

    // Assert
    const products = db.product.getAll();
    const rows = screen.getAllByRole('row');
    const dataRows = rows.slice(1);
    expect(dataRows).toHaveLength(products.length);

    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });
});
