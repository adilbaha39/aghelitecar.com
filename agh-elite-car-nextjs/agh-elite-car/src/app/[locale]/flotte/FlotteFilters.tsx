"use client";

import { useMemo, useState } from "react";
import type { Car } from "@/data/cars";
import CarCard from "@/components/CarCard";
import type { Dictionary } from "@/i18n/get-dictionary";

export default function FlotteFilters({
  cars,
  locale,
  dict,
}: {
  cars: Car[];
  locale: string;
  dict: Dictionary;
}) {
  const [type, setType] = useState("all");
  const [price, setPrice] = useState("all");
  const [trans, setTrans] = useState("all");
  const t = dict.fleet;

  const filtered = useMemo(() => {
    let [min, max] = [0, 1e9];
    if (price !== "all") {
      const parts = price.split("-").map(Number);
      min = parts[0];
      max = parts[1] ?? 1e9;
    }
    return cars.filter(
      (c) =>
        (type === "all" || c.type === type) &&
        (trans === "all" || c.trans === trans) &&
        c.price >= min &&
        c.price <= max
    );
  }, [cars, type, price, trans]);

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#e8dfcc] p-4 md:p-5 flex flex-col md:flex-row gap-3 md:items-center mb-10 shadow-sm">
        <select value={type} onChange={(e) => setType(e.target.value)} className="flex-1 rounded-xl border border-[#e8dfcc] px-4 py-3 text-sm bg-[#faf7f1] focus:outline-none focus:border-[#b8893a]">
          <option value="all">{t.filterType}</option>
          <option value="Berline">{t.berline}</option>
          <option value="SUV">{t.suv}</option>
        </select>
        <select value={price} onChange={(e) => setPrice(e.target.value)} className="flex-1 rounded-xl border border-[#e8dfcc] px-4 py-3 text-sm bg-[#faf7f1] focus:outline-none focus:border-[#b8893a]">
          <option value="all">{t.filterPrice}</option>
          <option value="0-400">{t.priceLow}</option>
          <option value="400-600">{t.priceMid}</option>
          <option value="600-1000">{t.priceHigh}</option>
        </select>
        <select value={trans} onChange={(e) => setTrans(e.target.value)} className="flex-1 rounded-xl border border-[#e8dfcc] px-4 py-3 text-sm bg-[#faf7f1] focus:outline-none focus:border-[#b8893a]">
          <option value="all">{t.filterTrans}</option>
          <option value="Auto">{t.auto}</option>
          <option value="Manuelle">{t.manual}</option>
        </select>
      </div>

      <div className="flex items-end justify-between mb-6">
        <h2 className="font-serif text-2xl md:text-3xl font-medium">{t.choose}</h2>
        <p className="text-sm text-[#6b6b6b] hidden sm:block">
          {filtered.length} {filtered.length > 1 ? t.vehiclesPlural : t.vehicles}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center py-16 text-[#6b6b6b]">{t.empty}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((car) => (
            <CarCard key={car.id} car={car} locale={locale} perDay={t.perDay} popularLabel={t.popular} />
          ))}
        </div>
      )}
    </>
  );
}
