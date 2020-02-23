class CoffeeController < ApplicationController
    def index
        limit = (params[:limit] || 10).to_i
        page = (params[:offset] || 0).to_i
        origin_filter = params[:origin] || ""

        all = Coffee.all.to_a
        filtered = all.select { |coffee| coffee.origin.include? origin_filter }
        chunks = filtered.each_slice(limit).to_a
        coffees = chunks[page]
        # byebug
        render json: coffees
    end
end
