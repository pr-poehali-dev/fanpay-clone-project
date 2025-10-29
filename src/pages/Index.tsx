import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  game: string;
  title: string;
  price: number;
  seller: {
    name: string;
    rating: number;
    deals: number;
    avatar: string;
    joinDate: string;
    description: string;
  };
  category: string;
  image: string;
  online: boolean;
  description: string;
  features: string[];
}

interface User {
  name: string;
  email: string;
  avatar: string;
  balance: number;
  deals: number;
  rating: number;
  isSeller: boolean;
}

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isOwn: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const games = [
  { name: 'CS2', icon: '🎯', color: 'from-orange-500 to-red-600' },
  { name: 'Dota 2', icon: '⚔️', color: 'from-red-500 to-purple-600' },
  { name: 'Valorant', icon: '🔥', color: 'from-pink-500 to-red-600' },
  { name: 'GTA V', icon: '🚗', color: 'from-green-500 to-blue-600' },
  { name: 'Fortnite', icon: '🏆', color: 'from-blue-500 to-purple-600' },
  { name: 'LoL', icon: '⭐', color: 'from-yellow-500 to-orange-600' },
];

const products: Product[] = [
  {
    id: 1,
    game: 'CS2',
    title: 'Аккаунт Prime | 2000+ часов | Много скинов',
    price: 2500,
    seller: { name: 'ProGamer777', rating: 4.9, deals: 847, avatar: '🎮', joinDate: 'На площадке с 2022', description: 'Профессиональный продавец игровых аккаунтов. Гарантия качества.' },
    category: 'Аккаунты',
    image: '🎯',
    online: true,
    description: 'Отличный аккаунт CS2 с Prime статусом. Более 2000 часов игрового времени. В наличии множество редких скинов на сумму более 50000₽.',
    features: ['Prime статус', '2000+ часов', 'Скины на 50000₽', 'Ранг: Legendary Eagle', 'Полный доступ к почте', 'Без VAC банов'],
  },
  {
    id: 2,
    game: 'Dota 2',
    title: 'Дота 2 | 5000 MMR | Все герои | Аркана',
    price: 3200,
    seller: { name: 'DotaKing', rating: 4.8, deals: 623, avatar: '⚔️', joinDate: 'На площадке с 2021', description: 'Специализируюсь на продаже Dota 2 аккаунтов высокого уровня.' },
    category: 'Аккаунты',
    image: '⚔️',
    online: true,
    description: 'Аккаунт с рейтингом 5000 MMR. Открыты все герои, есть несколько Аркан. Идеально подходит для рейтинговых игр.',
    features: ['5000 MMR', 'Все герои разблокированы', '3 Арканы', 'Battle Pass Level 500', 'Множество косметики', 'Чистая репутация'],
  },
  {
    id: 3,
    game: 'Valorant',
    title: 'Валорант | Иммортал | 50+ скинов',
    price: 4500,
    seller: { name: 'ValMaster', rating: 5.0, deals: 1240, avatar: '🔥', joinDate: 'На площадке с 2023', description: 'Топ-продавец. Более 1000 успешных сделок. Всегда на связи.' },
    category: 'Аккаунты',
    image: '🔥',
    online: false,
    description: 'Аккаунт ранга Иммортал с огромной коллекцией скинов. Более 50 премиум скинов на оружие включая коллекционные.',
    features: ['Ранг: Иммортал', '50+ премиум скинов', 'Эксклюзивные коллекции', 'Все агенты', 'Полный доступ', 'История без банов'],
  },
  {
    id: 4,
    game: 'GTA V',
    title: 'GTA Online | 200 млн$ | 300 lvl',
    price: 1800,
    seller: { name: 'GTArich', rating: 4.7, deals: 456, avatar: '🚗', joinDate: 'На площадке с 2023', description: 'Продаю прокачанные аккаунты GTA Online с большим количеством денег.' },
    category: 'Аккаунты',
    image: '🚗',
    online: true,
    description: 'Полностью прокачанный аккаунт GTA Online. 200 миллионов игровых долларов, 300 уровень, весь транспорт и недвижимость.',
    features: ['200 млн $', '300 уровень', 'Весь транспорт', 'Вся недвижимость', 'Все бизнесы', 'Полный гараж'],
  },
  {
    id: 5,
    game: 'CS2',
    title: 'Нож Karambit | Factory New | Trade',
    price: 15000,
    seller: { name: 'SkinDealer', rating: 4.9, deals: 2103, avatar: '💎', joinDate: 'На площадке с 2020', description: 'Крупнейший продавец CS2 скинов. Работаю напрямую с трейдерами.' },
    category: 'Предметы',
    image: '🎯',
    online: true,
    description: 'Нож Karambit в состоянии Factory New. Один из самых редких скинов в CS2. Доступен для трейда.',
    features: ['Karambit', 'Factory New', 'Trade Ready', 'Float < 0.01', 'Редкий паттерн', 'Оригинальная упаковка'],
  },
  {
    id: 6,
    game: 'Fortnite',
    title: 'Фортнайт | 150+ скинов | Редкие',
    price: 2900,
    seller: { name: 'FortnitePro', rating: 4.8, deals: 789, avatar: '🏆', joinDate: 'На площадке с 2022', description: 'Продаю редкие аккаунты Fortnite с эксклюзивными скинами.' },
    category: 'Аккаунты',
    image: '🏆',
    online: true,
    description: 'Уникальный аккаунт Fortnite с коллекцией из 150+ скинов включая редкие и эксклюзивные из прошлых сезонов.',
    features: ['150+ скинов', 'Редкие эмоции', 'Эксклюзивные планеры', 'Все Battle Pass', 'V-Bucks в наличии', 'Полный доступ'],
  },
];

export default function Index() {
  const [selectedGame, setSelectedGame] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { id: 1, sender: 'ProGamer777', text: 'Здравствуйте! Интересует аккаунт?', time: '14:32', isOwn: false },
    { id: 2, sender: 'Вы', text: 'Да, расскажите подробнее', time: '14:33', isOwn: true },
    { id: 3, sender: 'ProGamer777', text: 'Конечно! Аккаунт с Prime, много скинов, полный доступ к почте.', time: '14:33', isOwn: false },
  ]);
  const [messageText, setMessageText] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const filteredProducts = products.filter(
    (product) =>
      (selectedGame === 'Все' || product.game === selectedGame) &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl">
                🎮
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                GameMarket
              </h1>
            </div>

            <div className="flex-1 max-w-xl min-w-[200px]">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Поиск аккаунтов, предметов, игр..."
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => setIsChatOpen(true)}>
                <Icon name="MessageSquare" size={20} />
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10 relative" onClick={() => setIsCartOpen(true)}>
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-xs flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
              {user ? (
                <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => setIsProfileOpen(true)}>
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {user.name}
                </Button>
              ) : (
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" onClick={() => setIsAuthOpen(true)}>
                  <Icon name="User" size={18} className="mr-2" />
                  Войти
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card
            className={`cursor-pointer transition-all hover:scale-105 animate-fade-in ${
              selectedGame === 'Все'
                ? 'bg-gradient-to-br from-purple-600 to-pink-600 border-purple-500'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
            onClick={() => setSelectedGame('Все')}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">🌟</div>
              <p className="text-white font-semibold">Все игры</p>
            </CardContent>
          </Card>
          {games.map((game, index) => (
            <Card
              key={game.name}
              className={`cursor-pointer transition-all hover:scale-105 animate-fade-in ${
                selectedGame === game.name
                  ? `bg-gradient-to-br ${game.color} border-white/20`
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedGame(game.name)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-2">{game.icon}</div>
                <p className="text-white font-semibold">{game.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-6 animate-fade-in">
        <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30 backdrop-blur">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">12,547</div>
                <div className="text-gray-400 text-sm">Активных предложений</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">3,891</div>
                <div className="text-gray-400 text-sm">Продавцов онлайн</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">47,203</div>
                <div className="text-gray-400 text-sm">Сделок за месяц</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">99.7%</div>
                <div className="text-gray-400 text-sm">Успешных сделок</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-white">
            {selectedGame === 'Все' ? 'Все предложения' : selectedGame}
            <span className="text-gray-400 text-lg ml-2">({filteredProducts.length})</span>
          </h2>
          <Tabs defaultValue="all" className="w-auto">
            <TabsList className="bg-white/5">
              <TabsTrigger value="all" className="text-white data-[state=active]:bg-purple-600">Все</TabsTrigger>
              <TabsTrigger value="accounts" className="text-white data-[state=active]:bg-purple-600">Аккаунты</TabsTrigger>
              <TabsTrigger value="items" className="text-white data-[state=active]:bg-purple-600">Предметы</TabsTrigger>
              <TabsTrigger value="currency" className="text-white data-[state=active]:bg-purple-600">Валюта</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedProduct(product)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge className="bg-purple-600 mb-2">{product.category}</Badge>
                    <CardTitle className="text-white text-lg group-hover:text-purple-400 transition-colors">
                      {product.title}
                    </CardTitle>
                  </div>
                  <div className="text-4xl ml-2">{product.image}</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600">
                        {product.seller.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-white text-sm font-semibold">{product.seller.name}</p>
                        {product.online && (
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Icon name="Star" size={12} className="fill-yellow-500 text-yellow-500" />
                          {product.seller.rating}
                        </span>
                        <span>•</span>
                        <span>{product.seller.deals} сделок</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">{product.price} ₽</div>
                    <div className="text-xs text-gray-400">За аккаунт</div>
                  </div>
                  <Button 
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      const existingItem = cart.find(item => item.product.id === product.id);
                      if (existingItem) {
                        setCart(cart.map(item => 
                          item.product.id === product.id 
                            ? { ...item, quantity: item.quantity + 1 } 
                            : item
                        ));
                      } else {
                        setCart([...cart, { product, quantity: 1 }]);
                      }
                    }}
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Купить
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/30 backdrop-blur-xl mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">О платформе</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">Как это работает</li>
                <li className="hover:text-white cursor-pointer transition-colors">Безопасность</li>
                <li className="hover:text-white cursor-pointer transition-colors">Правила</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Продавцам</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">Начать продавать</li>
                <li className="hover:text-white cursor-pointer transition-colors">Комиссии</li>
                <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Поддержка</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">Помощь</li>
                <li className="hover:text-white cursor-pointer transition-colors">Споры</li>
                <li className="hover:text-white cursor-pointer transition-colors">Контакты</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Мы в соцсетях</h3>
              <div className="flex gap-3">
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                  <Icon name="MessageCircle" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                  <Icon name="Send" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                  <Icon name="Youtube" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-6 text-center text-gray-400 text-sm">
            © 2024 GameMarket. Маркетплейс игровых аккаунтов и предметов.
          </div>
        </div>
      </footer>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl bg-slate-950 text-white border-white/10">
          {selectedProduct && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge className="bg-purple-600 mb-2">{selectedProduct.category}</Badge>
                    <DialogTitle className="text-2xl text-white mb-2">{selectedProduct.title}</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      {selectedProduct.description}
                    </DialogDescription>
                  </div>
                  <div className="text-6xl ml-4">{selectedProduct.image}</div>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-white">Характеристики</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProduct.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Icon name="CheckCircle2" size={16} className="text-green-500" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-white/10" />

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-white">О продавце</h3>
                    <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-2xl">
                          {selectedProduct.seller.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white">{selectedProduct.seller.name}</h4>
                          {selectedProduct.online && (
                            <Badge className="bg-green-600">Онлайн</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Icon name="Star" size={14} className="fill-yellow-500 text-yellow-500" />
                            {selectedProduct.seller.rating}
                          </span>
                          <span>•</span>
                          <span>{selectedProduct.seller.deals} сделок</span>
                          <span>•</span>
                          <span>{selectedProduct.seller.joinDate}</span>
                        </div>
                        <p className="text-sm text-gray-300">{selectedProduct.seller.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="text-4xl font-bold text-white mb-1">{selectedProduct.price} ₽</div>
                        <div className="text-sm text-gray-400">За аккаунт</div>
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 mb-2"
                        onClick={() => {
                          const existingItem = cart.find(item => item.product.id === selectedProduct.id);
                          if (existingItem) {
                            setCart(cart.map(item => 
                              item.product.id === selectedProduct.id 
                                ? { ...item, quantity: item.quantity + 1 } 
                                : item
                            ));
                          } else {
                            setCart([...cart, { product: selectedProduct, quantity: 1 }]);
                          }
                          setSelectedProduct(null);
                          setIsCartOpen(true);
                        }}
                      >
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-white/10 text-white hover:bg-white/10"
                        onClick={() => {
                          setSelectedProduct(null);
                          setIsChatOpen(true);
                        }}
                      >
                        <Icon name="MessageSquare" size={18} className="mr-2" />
                        Написать
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2">
                        <Icon name="Shield" size={20} className="text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-white text-sm mb-1">Гарантия безопасности</h4>
                          <p className="text-xs text-gray-300">Защита сделки и возврат средств при проблемах</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="max-w-md bg-slate-950 text-white border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">
              {authMode === 'login' ? 'Вход' : 'Регистрация'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {authMode === 'login' 
                ? 'Войдите в свой аккаунт для продолжения' 
                : 'Создайте аккаунт для покупок и продаж'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {authMode === 'register' && (
              <div>
                <label className="text-sm text-gray-300 mb-1 block">Имя</label>
                <Input placeholder="Ваше имя" className="bg-white/5 border-white/10 text-white" />
              </div>
            )}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Email</label>
              <Input type="email" placeholder="mail@example.com" className="bg-white/5 border-white/10 text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Пароль</label>
              <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/10 text-white" />
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => {
                setUser({
                  name: 'Player123',
                  email: 'player@example.com',
                  avatar: '🎮',
                  balance: 5000,
                  deals: 12,
                  rating: 4.8,
                  isSeller: false,
                });
                setIsAuthOpen(false);
              }}
            >
              {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-400">
                {authMode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
              </span>
              {' '}
              <button 
                className="text-purple-400 hover:text-purple-300"
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              >
                {authMode === 'login' ? 'Зарегистрироваться' : 'Войти'}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent className="w-full sm:max-w-xl bg-slate-950 text-white border-l border-white/10">
          <SheetHeader>
            <SheetTitle className="text-white">Сообщения</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-full mt-4">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        {!msg.isOwn && (
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-xs">
                              🎮
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <span className="text-xs text-gray-400">{msg.sender}</span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <div
                        className={`rounded-lg p-3 ${
                          msg.isOwn
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                            : 'bg-white/5'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-4 flex gap-2">
              <Textarea
                placeholder="Напишите сообщение..."
                className="bg-white/5 border-white/10 text-white resize-none"
                rows={2}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => {
                  if (messageText.trim()) {
                    setChatMessages([
                      ...chatMessages,
                      {
                        id: chatMessages.length + 1,
                        sender: 'Вы',
                        text: messageText,
                        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
                        isOwn: true,
                      },
                    ]);
                    setMessageText('');
                  }
                }}
              >
                <Icon name="Send" size={18} />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full sm:max-w-xl bg-slate-950 text-white border-l border-white/10">
          <SheetHeader>
            <SheetTitle className="text-white">Корзина ({cart.length})</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-full mt-4">
            {cart.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Icon name="ShoppingCart" size={64} className="mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-400">Корзина пуста</p>
                </div>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <Card key={item.product.id} className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="text-4xl">{item.product.image}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-white mb-1">{item.product.title}</h3>
                              <p className="text-sm text-gray-400 mb-2">{item.product.game}</p>
                              <div className="flex items-center justify-between">
                                <div className="text-xl font-bold text-white">{item.product.price} ₽</div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                  onClick={() => setCart(cart.filter(i => i.product.id !== item.product.id))}
                                >
                                  <Icon name="Trash2" size={16} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>

                <div className="mt-4 space-y-4">
                  <Separator className="bg-white/10" />
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-gray-400">Итого:</span>
                    <span className="text-2xl font-bold text-white">
                      {cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)} ₽
                    </span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                    <Icon name="CreditCard" size={18} className="mr-2" />
                    Оформить заказ
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <SheetContent className="w-full sm:max-w-xl bg-slate-950 text-white border-l border-white/10">
          <SheetHeader>
            <SheetTitle className="text-white">Профиль</SheetTitle>
          </SheetHeader>

          {user && (
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-4xl">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-white">{user.name}</h3>
                  <p className="text-gray-400">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Icon name="Star" size={14} className="fill-yellow-500 text-yellow-500" />
                    <span className="text-sm text-gray-300">{user.rating}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm text-gray-300">{user.deals} сделок</span>
                  </div>
                </div>
              </div>

              <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">Баланс</div>
                    <div className="text-3xl font-bold text-white">{user.balance} ₽</div>
                    <Button className="mt-4 bg-white/10 hover:bg-white/20">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Пополнить
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                  <Icon name="Package" size={18} className="mr-3" />
                  Мои покупки
                </Button>
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                  <Icon name="Heart" size={18} className="mr-3" />
                  Избранное
                </Button>
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                  <Icon name="Settings" size={18} className="mr-3" />
                  Настройки
                </Button>
                {!user.isSeller && (
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                    onClick={() => {
                      setUser({ ...user, isSeller: true });
                    }}
                  >
                    <Icon name="Store" size={18} className="mr-3" />
                    Стать продавцом
                  </Button>
                )}
                {user.isSeller && (
                  <>
                    <Separator className="bg-white/10 my-4" />
                    <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                      <Icon name="PlusCircle" size={18} className="mr-3" />
                      Добавить товар
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                      <Icon name="Package" size={18} className="mr-3" />
                      Мои товары
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                      <Icon name="BarChart3" size={18} className="mr-3" />
                      Статистика продаж
                    </Button>
                  </>
                )}
                <Separator className="bg-white/10 my-4" />
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-400 hover:bg-red-500/10 hover:text-red-300"
                  onClick={() => {
                    setUser(null);
                    setIsProfileOpen(false);
                  }}
                >
                  <Icon name="LogOut" size={18} className="mr-3" />
                  Выйти
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}