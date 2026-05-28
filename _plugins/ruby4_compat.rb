# Liquid 4.x calls tainted?/untaint/taint which were removed in Ruby 3.2.
# Restore them as no-ops so Jekyll 4.x renders correctly on Ruby 4.0.
if RUBY_VERSION >= "3.2"
  class Object
    def tainted?; false; end
    def untaint; self; end
    def taint; self; end
  end
end
