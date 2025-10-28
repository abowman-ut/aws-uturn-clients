import { putItem, getItem, updateItem, deleteItem, scanItems, queryItems } from './dynamodb.js';
import { config } from './config.js';

/**
 * Example: User management operations
 */
export class UserService {
	constructor() {
		this.tableName = config.dynamodb.tableName;
	}

	// Create a new user
	async createUser(userData) {
		const user = {
			id: userData.id || `user_${Date.now()}`,
			email: userData.email,
			name: userData.name,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			...userData
		};

		return await putItem(this.tableName, user);
	}

	// Get user by ID
	async getUserById(userId) {
		return await getItem(this.tableName, { id: userId });
	}

	// Update user
	async updateUser(userId, updateData) {
		const updateExpression = 'SET updatedAt = :updatedAt';
		const expressionAttributeValues = {
			':updatedAt': new Date().toISOString()
		};

		// Add dynamic update fields
		Object.keys(updateData).forEach(key => {
			if (key !== 'id') { // Don't allow updating the ID
				updateExpression += `, ${key} = :${key}`;
				expressionAttributeValues[`:${key}`] = updateData[key];
			}
		});

		return await updateItem(
			this.tableName,
			{ id: userId },
			updateExpression,
			expressionAttributeValues
		);
	}

	// Delete user
	async deleteUser(userId) {
		return await deleteItem(this.tableName, { id: userId });
	}

	// Get all users
	async getAllUsers() {
		return await scanItems(this.tableName);
	}
}

/**
 * Example: Product management operations
 */
export class ProductService {
	constructor() {
		this.tableName = config.dynamodb.tableName;
	}

	// Create a new product
	async createProduct(productData) {
		const product = {
			id: productData.id || `product_${Date.now()}`,
			name: productData.name,
			description: productData.description,
			price: productData.price,
			category: productData.category,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			...productData
		};

		return await putItem(this.tableName, product);
	}

	// Get product by ID
	async getProductById(productId) {
		return await getItem(this.tableName, { id: productId });
	}

	// Update product
	async updateProduct(productId, updateData) {
		const updateExpression = 'SET updatedAt = :updatedAt';
		const expressionAttributeValues = {
			':updatedAt': new Date().toISOString()
		};

		Object.keys(updateData).forEach(key => {
			if (key !== 'id') {
				updateExpression += `, ${key} = :${key}`;
				expressionAttributeValues[`:${key}`] = updateData[key];
			}
		});

		return await updateItem(
			this.tableName,
			{ id: productId },
			updateExpression,
			expressionAttributeValues
		);
	}

	// Delete product
	async deleteProduct(productId) {
		return await deleteItem(this.tableName, { id: productId });
	}

	// Get all products
	async getAllProducts() {
		return await scanItems(this.tableName);
	}

	// Get products by category
	async getProductsByCategory(category) {
		return await scanItems(
			this.tableName,
			'category = :category',
			{ ':category': category }
		);
	}
}

/**
 * Example: Generic CRUD operations
 */
export class GenericService {
	constructor(tableName) {
		this.tableName = tableName;
	}

	async create(item) {
		const itemWithTimestamps = {
			...item,
			id: item.id || `${this.tableName}_${Date.now()}`,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};

		return await putItem(this.tableName, itemWithTimestamps);
	}

	async getById(id) {
		return await getItem(this.tableName, { id });
	}

	async update(id, updateData) {
		const updateExpression = 'SET updatedAt = :updatedAt';
		const expressionAttributeValues = {
			':updatedAt': new Date().toISOString()
		};

		Object.keys(updateData).forEach(key => {
			if (key !== 'id') {
				updateExpression += `, ${key} = :${key}`;
				expressionAttributeValues[`:${key}`] = updateData[key];
			}
		});

		return await updateItem(
			this.tableName,
			{ id },
			updateExpression,
			expressionAttributeValues
		);
	}

	async delete(id) {
		return await deleteItem(this.tableName, { id });
	}

	async getAll() {
		return await scanItems(this.tableName);
	}
}
