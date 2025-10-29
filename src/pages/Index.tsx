import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  };
  category: string;
  image: string;
  online: boolean;
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
    seller: { name: 'ProGamer777', rating: 4.9, deals: 847, avatar: '🎮' },
    category: 'Аккаунты',
    image: '🎯',
    online: true,
  },
  {
    id: 2,
    game: 'Dota 2',
    title: 'Дота 2 | 5000 MMR | Все герои | Аркана',
    price: 3200,
    seller: { name: 'DotaKing', rating: 4.8, deals: 623, avatar: '⚔️' },
    category: 'Аккаунты',
    image: '⚔️',
    online: true,
  },
  {
    id: 3,
    game: 'Valorant',
    title: 'Валорант | Иммортал | 50+ скинов',
    price: 4500,
    seller: { name: 'ValMaster', rating: 5.0, deals: 1240, avatar: '🔥' },
    category: 'Аккаунты',
    image: '🔥',
    online: false,
  },
  {
    id: 4,
    game: 'GTA V',
    title: 'GTA Online | 200 млн$ | 300 lvl',
    price: 1800,
    seller: { name: 'GTArich', rating: 4.7, deals: 456, avatar: '🚗' },
    category: 'Аккаунты',
    image: '🚗',
    online: true,
  },
  {
    id: 5,
    game: 'CS2',
    title: 'Нож Karambit | Factory New | Trade',
    price: 15000,
    seller: { name: 'SkinDealer', rating: 4.9, deals: 2103, avatar: '💎' },
    category: 'Предметы',
    image: '🎯',
    online: true,
  },
  {
    id: 6,
    game: 'Fortnite',
    title: 'Фортнайт | 150+ скинов | Редкие',
    price: 2900,
    seller: { name: 'FortnitePro', rating: 4.8, deals: 789, avatar: '🏆' },
    category: 'Аккаунты',
    image: '🏆',
    online: true,
  },
];

export default function Index() {
  const [selectedGame, setSelectedGame] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState('');

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
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Icon name="Bell" size={20} />
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Icon name="MessageSquare" size={20} />
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Icon name="User" size={18} className="mr-2" />
                Войти
              </Button>
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
                  <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
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
    </div>
  );
}