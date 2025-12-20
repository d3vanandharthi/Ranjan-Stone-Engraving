try:
    import PIL
    from PIL import Image
    print("PIL_INSTALLED_SUCCESS")
except ImportError:
    print("PIL_NOT_FOUND")
