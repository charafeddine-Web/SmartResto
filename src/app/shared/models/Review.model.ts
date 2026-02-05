export interface Review {
  id: number;
  username: string;
  rating: number; 
  comment: string;
  date: Date;
  productId?: number; // Optionnel: ID du produit si c'est une review d'un plat
  productName?: string; // Optionnel: Nom du produit
}
